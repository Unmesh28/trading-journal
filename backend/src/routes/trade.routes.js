const express = require('express');
const router = express.Router();
const {
  getTrades,
  getTrade,
  createTrade,
  updateTrade,
  deleteTrade
} = require('../controllers/trade.controller');
const { protect } = require('../middleware/auth.middleware');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getTrades)
  .post(createTrade);

router.route('/:id')
  .get(getTrade)
  .put(updateTrade)
  .delete(deleteTrade);

module.exports = router;
