import axios from "axios";
// import camelcaseKeys from "camelcase-keys";

const apiEndPoint = "https://tsdb.duckdns.org:3022";

export const getAllProject = async (payload: any) => {
  const response = await axios.post(`${apiEndPoint}/project`, payload);
  return response;
};

export const getSearchProject = async (payload: any) => {
  console.log(payload);
  const response = await axios.post(`${apiEndPoint}/project/search`, payload);
  console.log(response.data);
  return response;
};

export const getProjectById = async (projectId: string) => {
  const response = await axios.get(`${apiEndPoint}/project/${projectId}`);
  return response;
};
