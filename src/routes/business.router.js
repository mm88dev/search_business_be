const express = require('express');
const router = express.Router();
const businessController = require('../controllers/business.controller');

// GET /search
router.get('/search', businessController.searchByNameOrAddress);
router.get('/:id', businessController.getById);

module.exports = router;
