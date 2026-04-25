const claimService = require('../services/claim.service');

const getAllClaims = async (req, res, next) => {
  try {
    const claims = await claimService.getAllClaims();
    res.json(claims);
  } catch (error) {
    next(error);
  }
};

const getClaimById = async (req, res, next) => {
  try {
    const claim = await claimService.getClaimById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.json(claim);
  } catch (error) {
    next(error);
  }
};

const createClaim = async (req, res, next) => {
  try {
    const claim = await claimService.createClaim(req.body);
    res.status(201).json(claim);
  } catch (error) {
    next(error);
  }
};

const updateClaim = async (req, res, next) => {
  try {
    const claim = await claimService.updateClaim(req.params.id, req.body);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.json(claim);
  } catch (error) {
    next(error);
  }
};

const deleteClaim = async (req, res, next) => {
  try {
    const claim = await claimService.deleteClaim(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.json({ message: 'Claim deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllClaims,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim
};