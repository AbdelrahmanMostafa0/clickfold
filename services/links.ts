import api from "./api";

export async function createLink(formData: FormData) {
  const { data } = await api.post("/links", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
