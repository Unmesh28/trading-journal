const express = require('express');
const router = express.Router();
const {
  getTradingRules,
  getTradingRule,
  createTradingRule,
  updateTradingRule,
  deleteTradingRule
} = require('../controllers/tradingRule.controller');
const { protect } = require('../middleware/auth.middleware');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getTradingRules)
  .post(createTradingRule);

router.route('/:id')
  .get(getTradingRule)
  .put(updateTradingRule)
  .delete(deleteTradingRule);

module.exports = router;
