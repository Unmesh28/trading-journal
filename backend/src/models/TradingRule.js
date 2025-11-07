const mongoose = require('mongoose');

const tradingRuleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a rule title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a rule description'],
    trim: true
  },
  category: {
    type: String,
    enum: ['ENTRY', 'EXIT', 'RISK_MANAGEMENT', 'POSITION_SIZING', 'GENERAL', 'PSYCHOLOGY'],
    default: 'GENERAL'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});

// Index for faster queries
tradingRuleSchema.index({ user: 1, isActive: 1 });

module.exports = mongoose.model('TradingRule', tradingRuleSchema);
