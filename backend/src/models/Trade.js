const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Market Type
  market: {
    type: String,
    enum: ['FOREX', 'CRYPTO', 'US', 'INDIAN'],
    required: [true, 'Please provide market type']
  },
  // Pair/Ticker
  pair: {
    type: String,
    required: [true, 'Please provide a pair/ticker symbol'],
    uppercase: true,
    trim: true
  },
  // Trade Type
  tradeType: {
    type: String,
    enum: ['LONG', 'SHORT'],
    required: [true, 'Please specify if trade is LONG or SHORT']
  },
  // Date
  date: {
    type: Date,
    required: [true, 'Please provide trade date'],
    default: Date.now
  },
  // Entry Price
  entry: {
    type: Number,
    required: [true, 'Please provide entry price'],
    min: [0, 'Entry price must be positive']
  },
  // Exit Price
  exit: {
    type: Number,
    default: null,
    min: [0, 'Exit price must be positive']
  },
  // Stop Loss
  sl: {
    type: Number,
    default: null,
    min: [0, 'Stop loss must be positive']
  },
  // Target
  target: {
    type: Number,
    default: null,
    min: [0, 'Target must be positive']
  },
  // Quantity
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: [0, 'Quantity must be positive']
  },
  // Leverage
  leverage: {
    type: Number,
    default: 1,
    min: [1, 'Leverage must be at least 1']
  },
  // Amount Invested
  amountInvested: {
    type: Number,
    required: [true, 'Please provide amount invested'],
    min: [0, 'Amount invested must be positive']
  },
  // Result (Win/Loss/Breakeven)
  result: {
    type: String,
    enum: ['WIN', 'LOSS', 'BREAKEVEN', 'OPEN', ''],
    default: 'OPEN'
  },
  // Profit/Loss
  profitLoss: {
    type: Number,
    default: null
  },
  profitLossPercentage: {
    type: Number,
    default: null
  },
  // Account
  account: {
    type: String,
    trim: true,
    default: 'Main Account'
  },
  // Strategy
  strategy: {
    type: String,
    trim: true,
    default: ''
  },
  // Reason behind the trade
  reasonForTrade: {
    type: String,
    default: ''
  },
  // Screenshots
  screenshots: [{
    type: String
  }],
  // Emotion before trade
  emotionBeforeTrade: {
    type: String,
    enum: ['CONFIDENT', 'NEUTRAL', 'ANXIOUS', 'FOMO', 'REVENGE', 'EXCITED', 'FEARFUL', ''],
    default: ''
  },
  // Emotion after trade
  emotionAfterTrade: {
    type: String,
    enum: ['CONFIDENT', 'NEUTRAL', 'ANXIOUS', 'FOMO', 'REVENGE', 'EXCITED', 'FEARFUL', 'SATISFIED', 'DISAPPOINTED', 'REGRET', ''],
    default: ''
  },
  // Did you follow the rules?
  followedRules: {
    type: Boolean,
    default: null
  },
  rulesNotFollowed: {
    type: String,
    default: ''
  },
  // Additional Notes
  notes: {
    type: String,
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
  // Status
  status: {
    type: String,
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  },
  // Tags
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Calculate profit/loss before saving
tradeSchema.pre('save', function(next) {
  if (this.exit && this.status === 'CLOSED') {
    const costBasis = this.entry * this.quantity;
    const proceeds = this.exit * this.quantity;

    if (this.tradeType === 'LONG') {
      this.profitLoss = proceeds - costBasis;
    } else {
      // SHORT trade
      this.profitLoss = costBasis - proceeds;
    }

    this.profitLossPercentage = (this.profitLoss / costBasis) * 100;

    // Auto-set result based on P&L
    if (this.profitLoss > 0) {
      this.result = 'WIN';
    } else if (this.profitLoss < 0) {
      this.result = 'LOSS';
    } else {
      this.result = 'BREAKEVEN';
    }
  }

  next();
});

// Index for faster queries
tradeSchema.index({ user: 1, date: -1 });
tradeSchema.index({ user: 1, pair: 1 });
tradeSchema.index({ user: 1, status: 1 });
tradeSchema.index({ user: 1, market: 1 });

module.exports = mongoose.model('Trade', tradeSchema);
