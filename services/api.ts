import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const MUTATING_METHODS = new Set(["post", "put", "patch", "delete"]);

// The csrfToken cookie is cross-site (frontend/API on different apex
// domains), so document.cookie can never read it. The backend instead
// returns the token in auth/profile response bodies; we hold it here
// in memory and echo it back as the x-csrf-token header.
let csrfToken: string | null = null;

export function setCsrfToken(token: string | null | undefined) {
  csrfToken = token ?? null;
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();
  if (method && MUTATING_METHODS.has(method) && csrfToken) {
    config.headers.set("x-csrf-token", csrfToken);
  }
  return config;
});

// Shared across concurrent 401s so a burst of requests triggers exactly
// one /auth/refresh call instead of one per request.
let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryAxiosRequestConfig;

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;

      if (!refreshPromise) {
        refreshPromise = axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {},
            { withCredentials: true },
          )
          .then((response) => {
            setCsrfToken(response.data?.csrfToken);
            return response;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        await refreshPromise;
        return api(original);
      } catch {
        // Refresh token is gone/expired — the session is over. Let the
        // rest of the app know so it can drop back to a logged-out state.
        setCsrfToken(null);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth:unauthorized"));
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
