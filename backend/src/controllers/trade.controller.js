const Trade = require('../models/Trade');

// @desc    Get all trades for logged in user
// @route   GET /api/trades
// @access  Private
const getTrades = async (req, res) => {
  try {
    const { status, ticker, sortBy = '-entryDate' } = req.query;

    const filter = { user: req.user._id };

    if (status) filter.status = status;
    if (ticker) filter.ticker = ticker.toUpperCase();

    const trades = await Trade.find(filter).sort(sortBy);

    res.status(200).json({
      success: true,
      count: trades.length,
      data: trades
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single trade
// @route   GET /api/trades/:id
// @access  Private
const getTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: 'Trade not found'
      });
    }

    // Make sure user owns trade
    if (trade.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this trade'
      });
    }

    res.status(200).json({
      success: true,
      data: trade
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new trade
// @route   POST /api/trades
// @access  Private
const createTrade = async (req, res) => {
  try {
    req.body.user = req.user._id;

    const trade = await Trade.create(req.body);

    res.status(201).json({
      success: true,
      data: trade
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update trade
// @route   PUT /api/trades/:id
// @access  Private
const updateTrade = async (req, res) => {
  try {
    let trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: 'Trade not found'
      });
    }

    // Make sure user owns trade
    if (trade.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this trade'
      });
    }

    trade = await Trade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: trade
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete trade
// @route   DELETE /api/trades/:id
// @access  Private
const deleteTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: 'Trade not found'
      });
    }

    // Make sure user owns trade
    if (trade.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this trade'
      });
    }

    await trade.deleteOne();

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
  getTrades,
  getTrade,
  createTrade,
  updateTrade,
  deleteTrade
};
