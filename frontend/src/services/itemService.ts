import axios from "axios";

import { getApiBaseUrl } from "../lib/utils";

const API_BASE = getApiBaseUrl();
const API = `${API_BASE}/api/items`;

export const getItems = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const addFoundItem = async (data: any) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const getItemById = async (id: string) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const submitClaim = async (data: any) => {
  const res = await axios.post(`${API_BASE}/api/claims`, data);
  return res.data;
};