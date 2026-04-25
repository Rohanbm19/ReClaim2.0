const Item = require('../models/item.model');
const blockchainService = require('./blockchain.service');

const getAllItems = async () => {
  return await Item.find().sort({ createdAt: -1 });
};

const getItemById = async (id) => {
  return await Item.findById(id);
};

const createItem = async (itemData) => {
  // Record on blockchain
  const bcResult = await blockchainService.recordTransaction(itemData);

  const item = new Item({
    ...itemData,
    blockchainTxId: bcResult.txHash
  });
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