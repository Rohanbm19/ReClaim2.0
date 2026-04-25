const Claim = require('../models/claim.model');
const verificationService = require('./verification.service');
const blockchainService = require('./blockchain.service');

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
  if (claimData.status === 'approved') {
    // Perform verification step
    await verificationService.verifyClaim(id);

    // Record the approval transaction
    const bcResult = await blockchainService.recordTransaction({ claimId: id, status: 'approved' });

    claimData.verifiedAt = Date.now();
    // In a real scenario, we might also store the bc txhash for claims too.
  }

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