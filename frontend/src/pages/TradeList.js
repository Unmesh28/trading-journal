import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrades } from '../services/api';
import './TradeList.css';

const TradeList = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchTrades();
  }, [filter]);

  const fetchTrades = async () => {
    try {
      const params = filter !== 'ALL' ? { status: filter } : {};
      const { data } = await getTrades(params);
      setTrades(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trades:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="trade-list-page">
        <div className="page-header">
          <h1>All Trades</h1>
          <Link to="/trades/add" className="btn btn-primary">
            Add Trade
          </Link>
        </div>

        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'OPEN' ? 'active' : ''}`}
            onClick={() => setFilter('OPEN')}
          >
            Open
          </button>
          <button
            className={`filter-btn ${filter === 'CLOSED' ? 'active' : ''}`}
            onClick={() => setFilter('CLOSED')}
          >
            Closed
          </button>
        </div>

        {trades.length === 0 ? (
          <div className="card">
            <p>No trades found.</p>
          </div>
        ) : (
          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ticker</th>
                  <th>Type</th>
                  <th>Entry Price</th>
                  <th>Exit Price</th>
                  <th>Quantity</th>
                  <th>P&L</th>
                  <th>P&L %</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade._id}>
                    <td>{new Date(trade.entryDate).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/trades/${trade._id}`} className="trade-link">
                        {trade.ticker}
                      </Link>
                    </td>
                    <td>
                      <span className={`type-badge ${trade.tradeType.toLowerCase()}`}>
                        {trade.tradeType}
                      </span>
                    </td>
                    <td>${trade.entryPrice.toFixed(2)}</td>
                    <td>{trade.exitPrice ? `$${trade.exitPrice.toFixed(2)}` : '-'}</td>
                    <td>{trade.quantity}</td>
                    <td className={trade.profitLoss >= 0 ? 'positive' : 'negative'}>
                      {trade.profitLoss !== null ? `$${trade.profitLoss.toFixed(2)}` : '-'}
                    </td>
                    <td className={trade.profitLossPercentage >= 0 ? 'positive' : 'negative'}>
                      {trade.profitLossPercentage !== null
                        ? `${trade.profitLossPercentage.toFixed(2)}%`
                        : '-'}
                    </td>
                    <td>
                      <span className={`status-badge ${trade.status.toLowerCase()}`}>
                        {trade.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/trades/edit/${trade._id}`} className="btn-action">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeList;
