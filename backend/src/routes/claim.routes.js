const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claim.controller');

router.get('/', claimController.getAllClaims);
router.get('/:id', claimController.getClaimById);
router.post('/', claimController.createClaim);
router.put('/:id', claimController.updateClaim);
router.delete('/:id', claimController.deleteClaim);

module.exports = router;
