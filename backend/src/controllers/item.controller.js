export const getItems = async (req, res) => {
  console.log("GET /api/items HIT");
  res.json([
    {
      _id: "1",
      title: "Test Item",
      locationFound: "Library",
    },
  ]);
};