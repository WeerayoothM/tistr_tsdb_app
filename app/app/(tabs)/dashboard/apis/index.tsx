import axios from "axios";
// import camelcaseKeys from "camelcase-keys";

const apiEndPoint = "https://tsdb.duckdns.org:3022";

export const getChart1 = async (payload?: any) => {
  const response = await axios.post(`${apiEndPoint}/dashboard/chart1`, payload);
  return response;
};

export const getChart2 = async (payload?: any) => {
  const response = await axios.post(`${apiEndPoint}/dashboard/chart2`, payload);
  return response;
};
