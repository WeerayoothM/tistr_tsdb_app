import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT;

export const getProjectList = async (payload: any) => {
  const response = await axios.post(`${apiEndPoint}/project`, payload);
  return camelcaseKeys(response, { deep: true });
};
