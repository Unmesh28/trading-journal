const TradingRule = require('../models/TradingRule');

// @desc    Get all trading rules for logged in user
// @route   GET /api/trading-rules
// @access  Private
const getTradingRules = async (req, res) => {
  try {
    const { isActive, category } = req.query;

    const filter = { user: req.user._id };

    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (category) filter.category = category;

    const rules = await TradingRule.find(filter).sort('-priority -createdAt');

    res.status(200).json({
      success: true,
      count: rules.length,
      data: rules
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single trading rule
// @route   GET /api/trading-rules/:id
// @access  Private
const getTradingRule = async (req, res) => {
  try {
    const rule = await TradingRule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: 'Trading rule not found'
      });
    }

    // Make sure user owns rule
    if (rule.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this rule'
      });
    }

    res.status(200).json({
      success: true,
      data: rule
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new trading rule
// @route   POST /api/trading-rules
// @access  Private
const createTradingRule = async (req, res) => {
  try {
    req.body.user = req.user._id;

    const rule = await TradingRule.create(req.body);

    res.status(201).json({
      success: true,
      data: rule
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update trading rule
// @route   PUT /api/trading-rules/:id
// @access  Private
const updateTradingRule = async (req, res) => {
  try {
    let rule = await TradingRule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: 'Trading rule not found'
      });
    }

    // Make sure user owns rule
    if (rule.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this rule'
      });
    }

    rule = await TradingRule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: rule
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete trading rule
// @route   DELETE /api/trading-rules/:id
// @access  Private
const deleteTradingRule = async (req, res) => {
  try {
    const rule = await TradingRule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: 'Trading rule not found'
      });
    }

    // Make sure user owns rule
    if (rule.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this rule'
      });
    }

    await rule.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getTradingRules,
  getTradingRule,
  createTradingRule,
  updateTradingRule,
  deleteTradingRule
};
