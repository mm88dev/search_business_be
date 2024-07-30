const express = require('express');
const router = express.Router();
const businessController = require('../controllers/business.controller');

// GET /search
router.get('/:id', businessController.getById);
router.get('/', businessController.searchByNameOrAddress);

module.exports = router;
