import api from "./api";

export const createCampaign = async (data: {
  name: string;
  description?: string;
}) => {
  const { data: res } = await api.post("/campaigns", data);
  return res;
};

export const getCampaigns = async () => {
  try {
    const { data } = await api.get("/campaigns");
    return data;
  } catch (error) {
    console.error("Error getting campaigns:", error);
    return null;
  }
};

export const getCampaign = async (id: string) => {
  try {
    const { data } = await api.get(`/campaigns/${id}`);
    return data;
  } catch (error) {
    console.error("Error getting campaign:", error);
    return null;
  }
};

export const updateCampaign = async (
  id: string,
  data: { name?: string; description?: string },
) => {
  const { data: res } = await api.put(`/campaigns/${id}`, data);
  return res;
};

export const deleteCampaign = async (id: string) => {
  const { data } = await api.delete(`/campaigns/${id}`);
  return data;
};

export const getCampaignStats = async (id: string, days?: number) => {
  try {
    const { data } = await api.get(`/campaigns/${id}/stats`, {
      params: days ? { days } : undefined,
    });
    return data;
  } catch (error) {
    console.error("Error getting campaign stats:", error);
    return null;
  }
};
