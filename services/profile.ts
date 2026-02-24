import api from "./api";

const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (data: any) => {
  try {
    const response = await api.patch("/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getProfile, updateProfile };
