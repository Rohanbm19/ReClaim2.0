const API_URL = import.meta.env.VITE_API_URL;

// 🔥 GET all items
export async function getItems() {
  const res = await fetch(`${API_URL}/items`);
  return res.json();
}

// 🔥 GET transactions
export async function getTransactions() {
  const res = await fetch(`${API_URL}/transactions`);
  return res.json();
}

// 🔥 REPORT ITEM
export async function reportItem(data: any) {
  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}