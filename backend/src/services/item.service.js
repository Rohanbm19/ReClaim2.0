const Item = require('../models/item.model');

const getAllItems = async () => {
  return await Item.find().sort({ createdAt: -1 });
};

const getItemById = async (id) => {
  return await Item.findById(id);
};

const createItem = async (itemData) => {
  const item = new Item(itemData);
  return await item.save();
};

const updateItem = async (id, itemData) => {
  return await Item.findByIdAndUpdate(id, itemData, { new: true, runValidators: true });
};

const deleteItem = async (id) => {
  return await Item.findByIdAndDelete(id);
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};