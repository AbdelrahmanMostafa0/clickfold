import api from "./api";

const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (data: FormData) => {
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

const updatePassword = async (data: {
  password: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  try {
    const response = await api.patch("/profile/password", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateAvatar = async (data: FormData) => {
  try {
    const response = await api.patch("/profile/avatar", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async () => {
  try {
    const response = await api.delete("/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};
const confirmDeleteAccount = async (token: string) => {
  try {
    const response = await api.delete("/profile/confirm-delete", {
      params: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {
  getProfile,
  updateProfile,
  updatePassword,
  updateAvatar,
  deleteAccount,
  confirmDeleteAccount,
};
