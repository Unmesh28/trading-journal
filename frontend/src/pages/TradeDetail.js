import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTrade, deleteTrade } from '../services/api';
import './TradeDetail.css';

const TradeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTrade();
  }, [id]);

  const fetchTrade = async () => {
    try {
      const { data } = await getTrade(id);
      setTrade(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trade:', error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this trade?')) {
      setDeleting(true);
      try {
        await deleteTrade(id);
        navigate('/trades');
      } catch (error) {
        console.error('Error deleting trade:', error);
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!trade) {
    return <div className="container">Trade not found</div>;
  }

  return (
    <div className="container">
      <div className="trade-detail-page">
        <div className="detail-header">
          <h1>{trade.ticker}</h1>
          <div className="detail-actions">
            <Link to={`/trades/edit/${id}`} className="btn btn-secondary">
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        <div className="detail-grid">
          <div className="card">
            <h2>Trade Information</h2>
            <div className="detail-row">
              <span className="detail-label">Type:</span>
              <span className={`type-badge ${trade.tradeType.toLowerCase()}`}>
                {trade.tradeType}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className={`status-badge ${trade.status.toLowerCase()}`}>
                {trade.status}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Entry Date:</span>
              <span>{new Date(trade.entryDate).toLocaleDateString()}</span>
            </div>
            {trade.exitDate && (
              <div className="detail-row">
                <span className="detail-label">Exit Date:</span>
                <span>{new Date(trade.exitDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="detail-row">
              <span className="detail-label">Entry Price:</span>
              <span>${trade.entryPrice.toFixed(2)}</span>
            </div>
            {trade.exitPrice && (
              <div className="detail-row">
                <span className="detail-label">Exit Price:</span>
                <span>${trade.exitPrice.toFixed(2)}</span>
              </div>
            )}
            <div className="detail-row">
              <span className="detail-label">Quantity:</span>
              <span>{trade.quantity}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Fees:</span>
              <span>${trade.fees.toFixed(2)}</span>
            </div>
            {trade.strategy && (
              <div className="detail-row">
                <span className="detail-label">Strategy:</span>
                <span>{trade.strategy}</span>
              </div>
            )}
            {trade.emotionalState && (
              <div className="detail-row">
                <span className="detail-label">Emotional State:</span>
                <span>{trade.emotionalState}</span>
              </div>
            )}
          </div>

          <div className="card">
            <h2>Performance</h2>
            {trade.profitLoss !== null ? (
              <>
                <div className="performance-metric">
                  <span className="metric-label">Profit/Loss:</span>
                  <span className={`metric-value ${trade.profitLoss >= 0 ? 'positive' : 'negative'}`}>
                    ${trade.profitLoss.toFixed(2)}
                  </span>
                </div>
                <div className="performance-metric">
                  <span className="metric-label">P&L Percentage:</span>
                  <span className={`metric-value ${trade.profitLossPercentage >= 0 ? 'positive' : 'negative'}`}>
                    {trade.profitLossPercentage.toFixed(2)}%
                  </span>
                </div>
              </>
            ) : (
              <p>Trade is still open. P&L will be calculated upon closing.</p>
            )}
          </div>
        </div>

        {trade.tags && trade.tags.length > 0 && (
          <div className="card">
            <h2>Tags</h2>
            <div className="tags-container">
              {trade.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {trade.notes && (
          <div className="card">
            <h2>Trade Notes</h2>
            <p className="detail-text">{trade.notes}</p>
          </div>
        )}

        {trade.mistakes && (
          <div className="card">
            <h2>Mistakes Made</h2>
            <p className="detail-text">{trade.mistakes}</p>
          </div>
        )}

        {trade.lessonsLearned && (
          <div className="card">
            <h2>Lessons Learned</h2>
            <p className="detail-text">{trade.lessonsLearned}</p>
          </div>
        )}

        <div className="back-link">
          <Link to="/trades">← Back to all trades</Link>
        </div>
      </div>
    </div>
  );
};

export default TradeDetail;
