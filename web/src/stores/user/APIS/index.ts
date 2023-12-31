import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT;

export const userLogin = async (payload: any) => {
  const response = await axios.post(`${apiEndPoint}/loginAdmin`, payload);
  return camelcaseKeys(response, { deep: true });
};
