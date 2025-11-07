import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTradingRule } from '../services/api';
import './TradingRuleForm.css';

const AddTradingRule = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'GENERAL',
    priority: 3,
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createTradingRule({
        ...formData,
        priority: parseInt(formData.priority)
      });
      navigate('/trading-rules');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create trading rule');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="rule-form-page">
        <h1>Add New Trading Rule</h1>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Rule Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Never risk more than 2% per trade"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the rule in detail..."
                rows="5"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="GENERAL">General</option>
                  <option value="ENTRY">Entry</option>
                  <option value="EXIT">Exit</option>
                  <option value="RISK_MANAGEMENT">Risk Management</option>
                  <option value="POSITION_SIZING">Position Sizing</option>
                  <option value="PSYCHOLOGY">Psychology</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority (1-5) *</label>
                <input
                  type="number"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  required
                />
                <small>1 = Lowest, 5 = Highest</small>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <span>Active (This rule will be enforced)</span>
              </label>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create Rule'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/trading-rules')}
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

export default AddTradingRule;
