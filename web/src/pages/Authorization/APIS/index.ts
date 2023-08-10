import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT;

export const getGroupOptions = async () => {
  const response = await axios.get(`${apiEndPoint}/user/getListGroup`);
  return camelcaseKeys(response, { deep: true });
};

export const getUserList = async ({ offset, limit = 10, payload }: any) => {
  const response = await axios.post(`${apiEndPoint}/user`, {
    offset,
    limit,
    data: payload,
  });
  return camelcaseKeys(response, { deep: true });
};

export const changeActive = async (id: string, status: string) => {
  const response = await axios.post(`${apiEndPoint}/user/setStatus/${id}`, {
    is_active: status,
  });
  return camelcaseKeys(response, { deep: true });
};
