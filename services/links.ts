import api from "./api";

export async function createLink(formData: FormData) {
  const { data } = await api.post("/links", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export const redirectLink = async (slug: string) => {
  try {
    const { data } = await api.get(`/links/redirect/${slug}`);
    return data;
  } catch (error) {
    console.error("Error redirecting link:", error);
    return null;
  }
};
export const getLinkOg = async (slug: string) => {
  try {
    const { data } = await api.get(`/links/og/${slug}`);
    return data;
  } catch (error) {
    console.error("Error getting link OG:", error);
    return null;
  }
};
export const userLinksStats = async (days?: number) => {
  try {
    const { data } = await api.get(`/links/stats`, {
      params: days ? { days } : undefined,
    });
    return data;
  } catch (error) {
    console.error("Error getting user links stats:", error);
    return null;
  }
};

export const getLinkAnalytics = async (slug: string, days?: number) => {
  try {
    const { data } = await api.get(`/links/analytics/${slug}`, {
      params: days ? { days } : undefined,
    });
    return data;
  } catch (error) {
    console.error("Error getting link analytics:", error);
    return null;
  }
};

export const userLinks = async ({
  page,
  limit,
  sortBy,
}: {
  page: number;
  limit: number;
  sortBy: string | undefined;
}) => {
  try {
    const { data } = await api.get(`/links`, {
      params: {
        page,
        limit,
        sortBy,
      },
    });
    return data;
  } catch (error) {
    console.error("Error getting user links:", error);
    return null;
  }
};
