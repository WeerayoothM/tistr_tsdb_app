import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT;

export const userLogin = async (payload: any) => {
  const response = await axios.post(`${apiEndPoint}/api/user/login`, payload);
  return camelcaseKeys(response, { deep: true });
};
