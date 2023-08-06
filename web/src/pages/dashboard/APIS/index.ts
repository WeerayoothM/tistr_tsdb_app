import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT;

export const getMixedChart = async ({ source = "", year = "" }: any) => {
  const response = await axios.post(`${apiEndPoint}/dashboard/chart1`, {
    source,
    year,
  });
  return camelcaseKeys(response, { deep: true });
};

export const getDoughnutChart = async ({ source = "", year = "" }: any) => {
  const response = await axios.post(`${apiEndPoint}/dashboard/chart2`, {
    source,
    year,
  });
  return camelcaseKeys(response, { deep: true });
};
