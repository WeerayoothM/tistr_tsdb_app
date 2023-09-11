import axios from "axios";
import { API_URL } from "@env";
// import camelcaseKeys from "camelcase-keys";

export const getAllProject = async (payload: any) => {
  const response = await axios.post(`${API_URL}/project`, payload);
  return response;
};

export const getSearchProject = async (payload: any) => {
  const response = await axios.post(`${API_URL}/project/search`, payload);
  return response;
};

export const getProjectById = async (projectId: string) => {
  const response = await axios.get(`${API_URL}/project/${projectId}`);
  return response;
};

export const getListStatus = async () => {
  const response = await axios.get(`${API_URL}/project/getListStatus`);
  return response;
};

export const getListResponsible = async () => {
  const response = await axios.get(`${API_URL}/project/getListResponsible`);
  return response;
};

export const getListGroup = async () => {
  const response = await axios.get(`${API_URL}/user/getListGroup`);
  return response;
};

export const getListSubDivision = async () => {
  const response = await axios.get(`${API_URL}/user/getListSubDivision`);
  return response;
};
