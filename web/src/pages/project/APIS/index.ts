import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT;

export const getProjectList = async ({
  offset,
  limit = 10,
  payload,
  source,
}: any) => {
  const response = await axios.post(`${apiEndPoint}/project/search`, {
    offset,
    limit,
    data: payload,
    source,
  });
  return camelcaseKeys(response, { deep: true });
};

export const getProjectDetail = async (id: any) => {
  const response = await axios.get(`${apiEndPoint}/project/${id}`);
  return camelcaseKeys(response, { deep: true });
};

export const getListProjectPlanByCode = async (id: any) => {
  const response = await axios.get(
    `${apiEndPoint}/project/getListProjectPlanByCode/${id}`
  );
  return camelcaseKeys(response, { deep: true });
};

export const getListProjectDisbByCode = async (id: any) => {
  const response = await axios.get(
    `${apiEndPoint}/project/getListProjectDisbByCode/${id}`
  );
  return camelcaseKeys(response, { deep: true });
};

export const getListProjectEvaByCode = async (id: any) => {
  const response = await axios.get(
    `${apiEndPoint}/project/getListProjectEvaByCode/${id}`
  );
  return camelcaseKeys(response, { deep: true });
};
