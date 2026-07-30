import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = `${API_BASE}/api/items`;

// ✅ ADD THIS (for fetching items)
export const getItems = async () => {
  const res = await axios.get(API);
  return res.data;
};

// ✅ already correct (for adding item)
export const addFoundItem = async (data: any) => {
  const res = await axios.post(API, data);
  return res.data;
};

// Fetch single item by ID
export const getItemById = async (id: string) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

// Submit a claim for an item
export const submitClaim = async (data: any) => {
  const res = await axios.post(`${API_BASE}/api/claims`, data);
  return res.data;
};