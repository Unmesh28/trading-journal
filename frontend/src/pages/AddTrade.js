import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrade } from '../services/api';
import './TradeForm.css';

const AddTrade = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    ticker: '',
    tradeType: 'LONG',
    entryDate: new Date().toISOString().split('T')[0],
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
    setLoading(true);

    try {
      // Convert tags string to array
      const tradeData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        entryPrice: parseFloat(formData.entryPrice),
        exitPrice: formData.exitPrice ? parseFloat(formData.exitPrice) : null,
        quantity: parseFloat(formData.quantity),
        fees: parseFloat(formData.fees),
        exitDate: formData.exitDate || null
      };

      await createTrade(tradeData);
      navigate('/trades');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create trade');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="trade-form-page">
        <h1>Add New Trade</h1>
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
                  placeholder="e.g., Breakout, Momentum, etc."
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
                placeholder="e.g., tech, earnings, swing"
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
                placeholder="Why did you take this trade? What was your thesis?"
              />
            </div>

            <div className="form-group">
              <label>Mistakes Made</label>
              <textarea
                name="mistakes"
                value={formData.mistakes}
                onChange={handleChange}
                placeholder="What mistakes did you make?"
              />
            </div>

            <div className="form-group">
              <label>Lessons Learned</label>
              <textarea
                name="lessonsLearned"
                value={formData.lessonsLearned}
                onChange={handleChange}
                placeholder="What did you learn from this trade?"
              />
            </div>

            {error && <div className="error">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create Trade'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/trades')}
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

export default AddTrade;
