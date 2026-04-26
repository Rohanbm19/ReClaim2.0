const Item = require("../models/item.model");

exports.createItem = async (req, res) => {
  try {
    console.log("📥 Incoming data:", req.body); // 👈 ADD THIS

    const item = new Item(req.body);
    await item.save();

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving item" });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching items" });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching item" });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating item" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting item" });
  }
};