const validateItem = (req, res, next) => {
  const { name, description, category, location } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required');
  }

  if (!description || typeof description !== 'string' || description.trim() === '') {
    errors.push('Description is required');
  }

  if (!category || !['electronics', 'clothing', 'documents', 'jewelry', 'other'].includes(category)) {
    errors.push('Valid category is required');
  }

  if (!location || typeof location !== 'string' || location.trim() === '') {
    errors.push('Location is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateClaim = (req, res, next) => {
  const { item, claimant, description } = req.body;
  const errors = [];

  if (!item) {
    errors.push('Item ID is required');
  }

  if (!claimant) {
    errors.push('Claimant ID is required');
  }

  if (!description || typeof description !== 'string' || description.trim() === '') {
    errors.push('Description is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  validateItem,
  validateClaim
};