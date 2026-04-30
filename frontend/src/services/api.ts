const BASE_URL = " https://reclaim2-0.onrender.com";

// 🔥 GET all items
export async function getItems() {
  const res = await fetch(`${BASE_URL}/items`);
  return res.json();
}

// 🔥 GET transactions
export async function getTransactions() {
  const res = await fetch(`${BASE_URL}/transactions`);
  return res.json();
}

// 🔥 REPORT ITEM
export async function reportItem(data: any) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}