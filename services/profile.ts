import api from "./api";

const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getProfile;
