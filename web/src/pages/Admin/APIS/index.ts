import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT;

export const getGroupOptions = async () => {
  const response = await axios.get(`${apiEndPoint}/user/getListGroup`);
  return camelcaseKeys(response, { deep: true });
};

export const getAdminList = async ({ offset, limit = 10, payload }: any) => {
  const response = await axios.post(`${apiEndPoint}/admin`, {
    offset,
    limit,
    data: payload,
  });
  return camelcaseKeys(response, { deep: true });
};

export const changeActive = async (id: string, status: string) => {
  const response = await axios.post(`${apiEndPoint}/admin/setStatus/${id}`, {
    is_active: status,
  });
  return camelcaseKeys(response, { deep: true });
};

export const addAdmin = async (id: string) => {
  const response = await axios.post(`${apiEndPoint}/admin/add/${id}`);
  return camelcaseKeys(response, { deep: true });
};

export const deleteAdmin = async (id: string) => {
  const response = await axios.post(`${apiEndPoint}/admin/del/${id}`);
  return camelcaseKeys(response, { deep: true });
};
