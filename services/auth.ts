import api, { setCsrfToken } from "./api";

const userLogin = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    setCsrfToken(response.data?.csrfToken);
    return response;
  } catch (error) {
    throw error;
  }
};

const userRegister = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response = await api.post("/auth/register", {
      email,
      password,
      name,
    });
    setCsrfToken(response.data?.csrfToken);
    return response;
  } catch (error) {
    throw error;
  }
};
const userLogout = async () => {
  try {
    return await api.post("/auth/logout");
  } finally {
    setCsrfToken(null);
  }
};
const googleLogin = async (access_token: string) => {
  try {
    const response = await api.post("/auth/google", {
      access_token,
    });
    setCsrfToken(response.data?.csrfToken);
    return response;
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (email: string) => {
  try {
    return await api.post("/auth/forgot-password", { email });
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (token: string, password: string) => {
  try {
    return await api.post("/auth/reset-password", { token, password });
  } catch (error) {
    throw error;
  }
};

export {
  userLogin,
  userRegister,
  userLogout,
  googleLogin,
  forgotPassword,
  resetPassword,
};
