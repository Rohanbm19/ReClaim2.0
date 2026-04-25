import axios from "axios";

const API = "http://localhost:5000/api/items";

// ✅ ADD THIS (for fetching items)
export const recentItems = async () => {
  const res = await axios.get(API);
  return res.data;
};

// ✅ already correct (for adding item)
export const addFoundItem = async (data: any) => {
  const res = await axios.post(API, data);
  return res.data;
};