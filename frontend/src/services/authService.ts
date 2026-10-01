import axios from "axios";

import { getApiBaseUrl } from "../lib/utils";

const API = getApiBaseUrl();

export const studentLogin = async (data: {
  username: string;
  password: string;
}) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data;
};

export const adminLogin = async (data: {
  adminName: string;
  securityKey: string;
}) => {
  const res = await axios.post(`${API}/admin/login`, data);
  return res.data;
};