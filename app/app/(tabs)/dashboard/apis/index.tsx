import axios from "axios";
import { API_URL } from "@env";
// import camelcaseKeys from "camelcase-keys";

export const getChart1 = async (payload?: any) => {
  const response = await axios.post(`${API_URL}/dashboard/chart1`, payload);
  return response;
};

export const getChart2 = async (payload?: any) => {
  const response = await axios.post(`${API_URL}/dashboard/chart2`, payload);
  return response;
};

export const getBox1 = async (payload?: any) => {
  const response = await axios.post(`${API_URL}/dashboard/box1`, payload);
  return response.data;
};
export const getBox2 = async (payload?: any) => {
  const response = await axios.post(`${API_URL}/dashboard/box2`, payload);
  return response.data;
};
export const getBox3 = async (payload?: any) => {
  const response = await axios.post(`${API_URL}/dashboard/box3`, payload);
  return response.data;
};
export const getBox4 = async (payload?: any) => {
  const response = await axios.post(`${API_URL}/dashboard/box4`, payload);
  return response.data;
};
export const getBox5 = async (payload?: any) => {
  const response = await axios.post(`${API_URL}/dashboard/box5`, payload);
  return response.data;
};
export const getBox6 = async (payload?: any) => {
  const response = await axios.post(`${API_URL}/dashboard/box6`, payload);
  return response.data;
};
