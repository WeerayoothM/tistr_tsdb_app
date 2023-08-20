import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT;

export const getBatchList = async ({ offset, limit = 10, payload }: any) => {
  const response = await axios.post(`${apiEndPoint}/batch`, {
    offset,
    limit,
    data: payload,
  });
  return camelcaseKeys(response, { deep: true });
};

export const uploadBatch = async (formData: any) => {
  const response = await axios.post(`${apiEndPoint}/batch/upload`, formData);
  return camelcaseKeys(response, { deep: true });
};

export const processBatch = async (code: any) => {
  const response = await axios.post(`${apiEndPoint}/batch/process`, {
    batch_code: code,
  });
  return camelcaseKeys(response, { deep: true });
};

export const cancelBatch = async (code: any) => {
  const response = await axios.post(`${apiEndPoint}/batch/cancel`, {
    batch_code: code,
  });
  return camelcaseKeys(response, { deep: true });
};

export const getBatchType = async () => {
  const response = await axios.get(`${apiEndPoint}/batch/batchType`);
  return camelcaseKeys(response, { deep: true });
};

export const getProperties = async (code: any) => {
  const response = await axios.post(`${apiEndPoint}/properties`, {
    group_code: code,
  });
  return camelcaseKeys(response, { deep: true });
};
