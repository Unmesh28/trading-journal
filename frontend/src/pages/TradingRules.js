import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTradingRules, deleteTradingRule, updateTradingRule } from '../services/api';
import './TradingRules.css';

const TradingRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchRules();
  }, [filter]);

  const fetchRules = async () => {
    try {
      const params = filter !== 'ALL' ? { isActive: filter === 'ACTIVE' } : {};
      const { data } = await getTradingRules(params);
      setRules(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rules:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      try {
        await deleteTradingRule(id);
        fetchRules();
      } catch (error) {
        console.error('Error deleting rule:', error);
      }
    }
  };

  const toggleActive = async (rule) => {
    try {
      await updateTradingRule(rule._id, { ...rule, isActive: !rule.isActive });
      fetchRules();
    } catch (error) {
      console.error('Error updating rule:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      ENTRY: '#3498db',
      EXIT: '#e74c3c',
      RISK_MANAGEMENT: '#f39c12',
      POSITION_SIZING: '#9b59b6',
      GENERAL: '#95a5a6',
      PSYCHOLOGY: '#1abc9c'
    };
    return colors[category] || '#95a5a6';
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="trading-rules-page">
        <div className="page-header">
          <h1>Trading Rules</h1>
          <Link to="/trading-rules/add" className="btn btn-primary">
            Add New Rule
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
            className={`filter-btn ${filter === 'ACTIVE' ? 'active' : ''}`}
            onClick={() => setFilter('ACTIVE')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'INACTIVE' ? 'active' : ''}`}
            onClick={() => setFilter('INACTIVE')}
          >
            Inactive
          </button>
        </div>

        {rules.length === 0 ? (
          <div className="card">
            <p>No trading rules found. Create your first rule to maintain discipline!</p>
          </div>
        ) : (
          <div className="rules-grid">
            {rules.map((rule) => (
              <div key={rule._id} className={`rule-card ${!rule.isActive ? 'inactive' : ''}`}>
                <div className="rule-header">
                  <div className="rule-title-section">
                    <h3>{rule.title}</h3>
                    <span
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(rule.category) }}
                    >
                      {rule.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="priority-badge">
                    Priority: {rule.priority}
                  </div>
                </div>

                <p className="rule-description">{rule.description}</p>

                <div className="rule-actions">
                  <button
                    onClick={() => toggleActive(rule)}
                    className={`btn-toggle ${rule.isActive ? 'active' : 'inactive'}`}
                  >
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <Link to={`/trading-rules/edit/${rule._id}`} className="btn-edit">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(rule._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingRules;
