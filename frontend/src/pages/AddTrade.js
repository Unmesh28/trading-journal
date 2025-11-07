import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrade } from '../services/api';
import './TradeForm.css';

const AddTrade = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    market: 'FOREX',
    pair: '',
    tradeType: 'LONG',
    date: new Date().toISOString().split('T')[0],
    entry: '',
    exit: '',
    sl: '',
    target: '',
    quantity: '',
    leverage: '1',
    amountInvested: '',
    account: 'Main Account',
    strategy: '',
    reasonForTrade: '',
    emotionBeforeTrade: '',
    emotionAfterTrade: '',
    followedRules: null,
    rulesNotFollowed: '',
    notes: '',
    mistakes: '',
    lessonsLearned: '',
    tags: '',
    status: 'OPEN'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFollowedRulesChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      followedRules: value === 'null' ? null : value === 'true'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tradeData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        entry: parseFloat(formData.entry),
        exit: formData.exit ? parseFloat(formData.exit) : null,
        sl: formData.sl ? parseFloat(formData.sl) : null,
        target: formData.target ? parseFloat(formData.target) : null,
        quantity: parseFloat(formData.quantity),
        leverage: parseFloat(formData.leverage),
        amountInvested: parseFloat(formData.amountInvested)
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
            <h3 className="section-title">Basic Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Market *</label>
                <select name="market" value={formData.market} onChange={handleChange} required>
                  <option value="FOREX">Forex</option>
                  <option value="CRYPTO">Crypto</option>
                  <option value="US">US Stocks</option>
                  <option value="INDIAN">Indian Stocks</option>
                </select>
              </div>
              <div className="form-group">
                <label>Pair/Ticker *</label>
                <input type="text" name="pair" value={formData.pair} onChange={handleChange} placeholder="e.g., EUR/USD, BTC/USDT, AAPL" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Trade Type *</label>
                <select name="tradeType" value={formData.tradeType} onChange={handleChange}>
                  <option value="LONG">LONG</option>
                  <option value="SHORT">SHORT</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Account *</label>
                <input type="text" name="account" value={formData.account} onChange={handleChange} placeholder="e.g., Main Account, Demo" required />
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
            </div>

            <h3 className="section-title">Trade Details</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Entry Price *</label>
                <input type="number" step="0.00001" name="entry" value={formData.entry} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Exit Price</label>
                <input type="number" step="0.00001" name="exit" value={formData.exit} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Stop Loss (SL)</label>
                <input type="number" step="0.00001" name="sl" value={formData.sl} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Target</label>
                <input type="number" step="0.00001" name="target" value={formData.target} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Quantity *</label>
                <input type="number" step="0.00001" name="quantity" value={formData.quantity} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Leverage</label>
                <input type="number" step="0.1" name="leverage" value={formData.leverage} onChange={handleChange} min="1" />
              </div>
            </div>

            <div className="form-group">
              <label>Amount Invested *</label>
              <input type="number" step="0.01" name="amountInvested" value={formData.amountInvested} onChange={handleChange} placeholder="Total amount invested" required />
            </div>

            <h3 className="section-title">Strategy & Analysis</h3>

            <div className="form-group">
              <label>Strategy</label>
              <input type="text" name="strategy" value={formData.strategy} onChange={handleChange} placeholder="e.g., Breakout, Trend Following" />
            </div>

            <div className="form-group">
              <label>Reason for Trade</label>
              <textarea name="reasonForTrade" value={formData.reasonForTrade} onChange={handleChange} placeholder="Why did you take this trade?" rows="3" />
            </div>

            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., breakout, support" />
            </div>

            <h3 className="section-title">Psychology & Rules</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Emotion Before Trade</label>
                <select name="emotionBeforeTrade" value={formData.emotionBeforeTrade} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="CONFIDENT">Confident</option>
                  <option value="NEUTRAL">Neutral</option>
                  <option value="ANXIOUS">Anxious</option>
                  <option value="FOMO">FOMO</option>
                  <option value="REVENGE">Revenge</option>
                  <option value="EXCITED">Excited</option>
                  <option value="FEARFUL">Fearful</option>
                </select>
              </div>
              <div className="form-group">
                <label>Emotion After Trade</label>
                <select name="emotionAfterTrade" value={formData.emotionAfterTrade} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="CONFIDENT">Confident</option>
                  <option value="NEUTRAL">Neutral</option>
                  <option value="SATISFIED">Satisfied</option>
                  <option value="DISAPPOINTED">Disappointed</option>
                  <option value="REGRET">Regret</option>
                  <option value="EXCITED">Excited</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Did You Follow Your Trading Rules?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="followedRules" checked={formData.followedRules === true} onChange={() => handleFollowedRulesChange('true')} />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="followedRules" checked={formData.followedRules === false} onChange={() => handleFollowedRulesChange('false')} />
                  <span>No</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="followedRules" checked={formData.followedRules === null} onChange={() => handleFollowedRulesChange('null')} />
                  <span>N/A</span>
                </label>
              </div>
            </div>

            {formData.followedRules === false && (
              <div className="form-group">
                <label>Which Rules Did You Not Follow?</label>
                <textarea name="rulesNotFollowed" value={formData.rulesNotFollowed} onChange={handleChange} placeholder="Describe which rules you broke..." rows="3" />
              </div>
            )}

            <h3 className="section-title">Notes & Lessons</h3>

            <div className="form-group">
              <label>Trade Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional notes..." rows="3" />
            </div>

            <div className="form-group">
              <label>Mistakes Made</label>
              <textarea name="mistakes" value={formData.mistakes} onChange={handleChange} placeholder="What mistakes did you make?" rows="3" />
            </div>

            <div className="form-group">
              <label>Lessons Learned</label>
              <textarea name="lessonsLearned" value={formData.lessonsLearned} onChange={handleChange} placeholder="What did you learn?" rows="3" />
            </div>

            {error && <div className="error">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create Trade'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/trades')}>
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
