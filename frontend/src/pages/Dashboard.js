import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrades, getSummary } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [recentTrades, setRecentTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [summaryRes, tradesRes] = await Promise.all([
        getSummary(),
        getTrades({ sortBy: '-entryDate' })
      ]);

      setSummary(summaryRes.data.data);
      setRecentTrades(tradesRes.data.data.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <h1>Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Trades</h3>
            <p className="stat-value">{summary?.totalTrades || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Win Rate</h3>
            <p className="stat-value">{summary?.winRate || 0}%</p>
          </div>
          <div className="stat-card">
            <h3>Total P&L</h3>
            <p className={`stat-value ${parseFloat(summary?.totalProfitLoss) >= 0 ? 'positive' : 'negative'}`}>
              ${summary?.totalProfitLoss || 0}
            </p>
          </div>
          <div className="stat-card">
            <h3>Profit Factor</h3>
            <p className="stat-value">{summary?.profitFactor || 0}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Trades</h2>
            <Link to="/trades/add" className="btn btn-primary">
              Add Trade
            </Link>
          </div>

          {recentTrades.length === 0 ? (
            <div className="card">
              <p>No trades yet. Start by adding your first trade!</p>
            </div>
          ) : (
            <div className="card">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Ticker</th>
                    <th>Type</th>
                    <th>Entry</th>
                    <th>Exit</th>
                    <th>P&L</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map((trade) => (
                    <tr key={trade._id}>
                      <td>{new Date(trade.entryDate).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/trades/${trade._id}`}>{trade.ticker}</Link>
                      </td>
                      <td>{trade.tradeType}</td>
                      <td>${trade.entryPrice}</td>
                      <td>{trade.exitPrice ? `$${trade.exitPrice}` : '-'}</td>
                      <td className={trade.profitLoss >= 0 ? 'positive' : 'negative'}>
                        {trade.profitLoss !== null ? `$${trade.profitLoss.toFixed(2)}` : '-'}
                      </td>
                      <td>
                        <span className={`status-badge ${trade.status.toLowerCase()}`}>
                          {trade.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="dashboard-actions">
            <Link to="/trades" className="btn btn-secondary">
              View All Trades
            </Link>
            <Link to="/analytics" className="btn btn-secondary">
              View Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
