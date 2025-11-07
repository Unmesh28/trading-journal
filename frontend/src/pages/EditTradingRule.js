import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTradingRule, updateTradingRule } from '../services/api';
import './TradingRuleForm.css';

const EditTradingRule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'GENERAL',
    priority: 3,
    isActive: true
  });

  useEffect(() => {
    fetchRule();
  }, [id]);

  const fetchRule = async () => {
    try {
      const { data } = await getTradingRule(id);
      const rule = data.data;

      setFormData({
        title: rule.title,
        description: rule.description,
        category: rule.category,
        priority: rule.priority,
        isActive: rule.isActive
      });

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch rule');
      setLoading(false);
    }
  };

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
    setSubmitting(true);

    try {
      await updateTradingRule(id, {
        ...formData,
        priority: parseInt(formData.priority)
      });
      navigate('/trading-rules');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update trading rule');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="rule-form-page">
        <h1>Edit Trading Rule</h1>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Rule Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
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
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Rule'}
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

export default EditTradingRule;
