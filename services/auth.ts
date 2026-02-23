import api from "./api";

const userLogin = async (email: string, password: string) => {
  return await api.post("/auth/login", {
    email,
    password,
  });
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
  return await api.post("/auth/register", {
    email,
    password,
    name,
  });
};
const googleLogin = async (access_token: string) => {
  return await api.post("/auth/google", {
    access_token,
  });
};
export { userLogin, userRegister, googleLogin };
