const Claim = require('../models/claim.model');

const getAllClaims = async () => {
  return await Claim.find()
    .populate('item')
    .populate('claimant')
    .sort({ createdAt: -1 });
};

const getClaimById = async (id) => {
  return await Claim.findById(id)
    .populate('item')
    .populate('claimant');
};

const createClaim = async (claimData) => {
  const claim = new Claim(claimData);
  return await claim.save();
};

const updateClaim = async (id, claimData) => {
  return await Claim.findByIdAndUpdate(id, claimData, { new: true, runValidators: true });
};

const deleteClaim = async (id) => {
  return await Claim.findByIdAndDelete(id);
};

module.exports = {
  getAllClaims,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim
};