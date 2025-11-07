const Trade = require('../models/Trade');

// @desc    Get trading summary statistics
// @route   GET /api/analytics/summary
// @access  Private
const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all closed trades
    const closedTrades = await Trade.find({
      user: userId,
      status: 'CLOSED'
    });

    if (closedTrades.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          totalTrades: 0,
          winningTrades: 0,
          losingTrades: 0,
          winRate: 0,
          totalProfitLoss: 0,
          averageWin: 0,
          averageLoss: 0,
          largestWin: 0,
          largestLoss: 0,
          profitFactor: 0,
          averageHoldTime: 0
        }
      });
    }

    const totalTrades = closedTrades.length;
    const winningTrades = closedTrades.filter(t => t.profitLoss > 0);
    const losingTrades = closedTrades.filter(t => t.profitLoss < 0);

    const totalProfitLoss = closedTrades.reduce((sum, t) => sum + t.profitLoss, 0);
    const totalGains = winningTrades.reduce((sum, t) => sum + t.profitLoss, 0);
    const totalLosses = Math.abs(losingTrades.reduce((sum, t) => sum + t.profitLoss, 0));

    const averageWin = winningTrades.length > 0
      ? totalGains / winningTrades.length
      : 0;

    const averageLoss = losingTrades.length > 0
      ? totalLosses / losingTrades.length
      : 0;

    const largestWin = winningTrades.length > 0
      ? Math.max(...winningTrades.map(t => t.profitLoss))
      : 0;

    const largestLoss = losingTrades.length > 0
      ? Math.min(...losingTrades.map(t => t.profitLoss))
      : 0;

    const profitFactor = totalLosses > 0 ? totalGains / totalLosses : 0;

    // Calculate average hold time (in days)
    const tradesWithDuration = closedTrades.filter(t => t.exitDate && t.entryDate);
    const averageHoldTime = tradesWithDuration.length > 0
      ? tradesWithDuration.reduce((sum, t) => {
          const duration = (new Date(t.exitDate) - new Date(t.entryDate)) / (1000 * 60 * 60 * 24);
          return sum + duration;
        }, 0) / tradesWithDuration.length
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalTrades,
        winningTrades: winningTrades.length,
        losingTrades: losingTrades.length,
        winRate: (winningTrades.length / totalTrades * 100).toFixed(2),
        totalProfitLoss: totalProfitLoss.toFixed(2),
        averageWin: averageWin.toFixed(2),
        averageLoss: averageLoss.toFixed(2),
        largestWin: largestWin.toFixed(2),
        largestLoss: largestLoss.toFixed(2),
        profitFactor: profitFactor.toFixed(2),
        averageHoldTime: averageHoldTime.toFixed(2)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get performance over time
// @route   GET /api/analytics/performance
// @access  Private
const getPerformance = async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = 'month' } = req.query; // day, week, month, year

    const closedTrades = await Trade.find({
      user: userId,
      status: 'CLOSED'
    }).sort('exitDate');

    // Group trades by time period
    const performanceData = {};

    closedTrades.forEach(trade => {
      if (!trade.exitDate) return;

      const date = new Date(trade.exitDate);
      let key;

      switch (period) {
        case 'day':
          key = date.toISOString().split('T')[0];
          break;
        case 'week':
          const week = getWeekNumber(date);
          key = `${date.getFullYear()}-W${week}`;
          break;
        case 'month':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        case 'year':
          key = date.getFullYear().toString();
          break;
        default:
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      }

      if (!performanceData[key]) {
        performanceData[key] = {
          period: key,
          profitLoss: 0,
          trades: 0,
          wins: 0,
          losses: 0
        };
      }

      performanceData[key].profitLoss += trade.profitLoss;
      performanceData[key].trades += 1;
      if (trade.profitLoss > 0) {
        performanceData[key].wins += 1;
      } else if (trade.profitLoss < 0) {
        performanceData[key].losses += 1;
      }
    });

    const performance = Object.values(performanceData).map(p => ({
      ...p,
      profitLoss: parseFloat(p.profitLoss.toFixed(2)),
      winRate: p.trades > 0 ? ((p.wins / p.trades) * 100).toFixed(2) : 0
    }));

    res.status(200).json({
      success: true,
      data: performance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to get week number
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

module.exports = {
  getSummary,
  getPerformance
};
