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

export const userLinksStats = async () => {
  try {
    const { data } = await api.get(`/links/stats`);
    return data;
  } catch (error) {
    console.error("Error getting user links stats:", error);
    return null;
  }
};
