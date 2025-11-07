import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTrade, updateTrade } from '../services/api';
import './TradeForm.css';

const EditTrade = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    ticker: '',
    tradeType: 'LONG',
    entryDate: '',
    exitDate: '',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    fees: 0,
    strategy: '',
    tags: '',
    notes: '',
    emotionalState: '',
    mistakes: '',
    lessonsLearned: '',
    status: 'OPEN'
  });

  useEffect(() => {
    fetchTrade();
  }, [id]);

  const fetchTrade = async () => {
    try {
      const { data } = await getTrade(id);
      const trade = data.data;

      setFormData({
        ticker: trade.ticker,
        tradeType: trade.tradeType,
        entryDate: trade.entryDate.split('T')[0],
        exitDate: trade.exitDate ? trade.exitDate.split('T')[0] : '',
        entryPrice: trade.entryPrice,
        exitPrice: trade.exitPrice || '',
        quantity: trade.quantity,
        fees: trade.fees,
        strategy: trade.strategy,
        tags: trade.tags.join(', '),
        notes: trade.notes,
        emotionalState: trade.emotionalState,
        mistakes: trade.mistakes,
        lessonsLearned: trade.lessonsLearned,
        status: trade.status
      });

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch trade');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const tradeData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        entryPrice: parseFloat(formData.entryPrice),
        exitPrice: formData.exitPrice ? parseFloat(formData.exitPrice) : null,
        quantity: parseFloat(formData.quantity),
        fees: parseFloat(formData.fees),
        exitDate: formData.exitDate || null
      };

      await updateTrade(id, tradeData);
      navigate(`/trades/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update trade');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="trade-form-page">
        <h1>Edit Trade</h1>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Ticker Symbol *</label>
                <input
                  type="text"
                  name="ticker"
                  value={formData.ticker}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Trade Type *</label>
                <select name="tradeType" value={formData.tradeType} onChange={handleChange}>
                  <option value="LONG">LONG</option>
                  <option value="SHORT">SHORT</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Entry Date *</label>
                <input
                  type="date"
                  name="entryDate"
                  value={formData.entryDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Exit Date</label>
                <input
                  type="date"
                  name="exitDate"
                  value={formData.exitDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Entry Price *</label>
                <input
                  type="number"
                  step="0.01"
                  name="entryPrice"
                  value={formData.entryPrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Exit Price</label>
                <input
                  type="number"
                  step="0.01"
                  name="exitPrice"
                  value={formData.exitPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  step="0.01"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fees</label>
                <input
                  type="number"
                  step="0.01"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Strategy</label>
                <input
                  type="text"
                  name="strategy"
                  value={formData.strategy}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Emotional State</label>
              <select name="emotionalState" value={formData.emotionalState} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="CONFIDENT">Confident</option>
                <option value="NEUTRAL">Neutral</option>
                <option value="ANXIOUS">Anxious</option>
                <option value="FOMO">FOMO</option>
                <option value="REVENGE">Revenge</option>
              </select>
            </div>

            <div className="form-group">
              <label>Trade Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Mistakes Made</label>
              <textarea
                name="mistakes"
                value={formData.mistakes}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Lessons Learned</label>
              <textarea
                name="lessonsLearned"
                value={formData.lessonsLearned}
                onChange={handleChange}
              />
            </div>

            {error && <div className="error">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Trade'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(`/trades/${id}`)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTrade;
