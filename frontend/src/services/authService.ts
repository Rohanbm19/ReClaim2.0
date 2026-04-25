import axios from "axios";

const API = import.meta.env.VITE_API_URL;

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