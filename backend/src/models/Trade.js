const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ticker: {
    type: String,
    required: [true, 'Please provide a ticker symbol'],
    uppercase: true,
    trim: true
  },
  tradeType: {
    type: String,
    enum: ['LONG', 'SHORT'],
    required: [true, 'Please specify if trade is LONG or SHORT']
  },
  entryDate: {
    type: Date,
    required: [true, 'Please provide entry date']
  },
  exitDate: {
    type: Date,
    default: null
  },
  entryPrice: {
    type: Number,
    required: [true, 'Please provide entry price'],
    min: [0, 'Entry price must be positive']
  },
  exitPrice: {
    type: Number,
    default: null,
    min: [0, 'Exit price must be positive']
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: [0, 'Quantity must be positive']
  },
  fees: {
    type: Number,
    default: 0,
    min: [0, 'Fees cannot be negative']
  },
  profitLoss: {
    type: Number,
    default: null
  },
  profitLossPercentage: {
    type: Number,
    default: null
  },
  strategy: {
    type: String,
    trim: true,
    default: ''
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    default: ''
  },
  emotionalState: {
    type: String,
    enum: ['CONFIDENT', 'NEUTRAL', 'ANXIOUS', 'FOMO', 'REVENGE', ''],
    default: ''
  },
  mistakes: {
    type: String,
    default: ''
  },
  lessonsLearned: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  },
  screenshots: [{
    type: String
  }]
}, {
  timestamps: true
});

// Calculate profit/loss before saving
tradeSchema.pre('save', function(next) {
  if (this.exitPrice && this.status === 'CLOSED') {
    const costBasis = this.entryPrice * this.quantity;
    const proceeds = this.exitPrice * this.quantity;

    if (this.tradeType === 'LONG') {
      this.profitLoss = proceeds - costBasis - this.fees;
    } else {
      // SHORT trade
      this.profitLoss = costBasis - proceeds - this.fees;
    }

    this.profitLossPercentage = (this.profitLoss / costBasis) * 100;
  }

  next();
});

// Index for faster queries
tradeSchema.index({ user: 1, entryDate: -1 });
tradeSchema.index({ user: 1, ticker: 1 });
tradeSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Trade', tradeSchema);
