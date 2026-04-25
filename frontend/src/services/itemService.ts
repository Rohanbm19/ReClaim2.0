import type { FoundItem } from "@/types/item";
import airpods from "@/assets/item-airpods.jpg";
import wallet from "@/assets/item-wallet.jpg";
import backpack from "@/assets/item-backpack.jpg";
import bottle from "@/assets/item-bottle.jpg";

const API_URL = "http://localhost:8080/api";

export const getItems = async () => {
  const res = await fetch(`${API_URL}/items`);
  return res.json();
};
