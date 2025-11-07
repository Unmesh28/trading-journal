const express = require('express');
const router = express.Router();
const {
  getSummary,
  getPerformance
} = require('../controllers/analytics.controller');
const { protect } = require('../middleware/auth.middleware');

// Protect all routes
router.use(protect);

router.get('/summary', getSummary);
router.get('/performance', getPerformance);

module.exports = router;
