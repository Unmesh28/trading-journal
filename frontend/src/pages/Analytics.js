import React, { useState, useEffect } from 'react';
import { getSummary, getPerformance } from '../services/api';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './Analytics.css';

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      const [summaryRes, performanceRes] = await Promise.all([
        getSummary(),
        getPerformance(period)
      ]);

      setSummary(summaryRes.data.data);
      setPerformance(performanceRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="analytics-page">
        <h1>Analytics</h1>

        <div className="stats-section">
          <h2>Overall Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Trades</h3>
              <p className="stat-value">{summary?.totalTrades || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Winning Trades</h3>
              <p className="stat-value positive">{summary?.winningTrades || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Losing Trades</h3>
              <p className="stat-value negative">{summary?.losingTrades || 0}</p>
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
              <h3>Average Win</h3>
              <p className="stat-value positive">${summary?.averageWin || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Average Loss</h3>
              <p className="stat-value negative">${summary?.averageLoss || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Profit Factor</h3>
              <p className="stat-value">{summary?.profitFactor || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Largest Win</h3>
              <p className="stat-value positive">${summary?.largestWin || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Largest Loss</h3>
              <p className="stat-value negative">${summary?.largestLoss || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Avg Hold Time</h3>
              <p className="stat-value">{summary?.averageHoldTime || 0} days</p>
            </div>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-header">
            <h2>Performance Over Time</h2>
            <div className="period-selector">
              <button
                className={period === 'day' ? 'active' : ''}
                onClick={() => setPeriod('day')}
              >
                Daily
              </button>
              <button
                className={period === 'week' ? 'active' : ''}
                onClick={() => setPeriod('week')}
              >
                Weekly
              </button>
              <button
                className={period === 'month' ? 'active' : ''}
                onClick={() => setPeriod('month')}
              >
                Monthly
              </button>
              <button
                className={period === 'year' ? 'active' : ''}
                onClick={() => setPeriod('year')}
              >
                Yearly
              </button>
            </div>
          </div>

          {performance.length === 0 ? (
            <div className="card">
              <p>No performance data available yet.</p>
            </div>
          ) : (
            <>
              <div className="card">
                <h3>Profit & Loss</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="profitLoss"
                      stroke="#3498db"
                      strokeWidth={2}
                      name="P&L"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <h3>Trades Count</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="wins" fill="#4CAF50" name="Wins" />
                    <Bar dataKey="losses" fill="#f44336" name="Losses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <h3>Win Rate Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="winRate"
                      stroke="#4CAF50"
                      strokeWidth={2}
                      name="Win Rate %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
