const BASE_URL = "https://reclaim2-0.onrender.com";

// 📦 Report new item
export async function reportItem(data: any) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to report item");
  }

  return res.json();
}