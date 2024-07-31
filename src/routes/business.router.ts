import express from 'express';
import {
  getById,
  searchByNameOrAddress
} from '../controllers/business.controller';
const router = express.Router();

// GET /search
router.get('/search', searchByNameOrAddress);
router.get('/:id', getById);

export default router;
