import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getComparisonStats, getCompletionStats, getHeatmapData, getRecurringTasks } from '../utils/storage';

function Dashboard() {
  const navigate = useNavigate();
  const [range, setRange] = useState('week');
  const [stats, setStats] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [heatmap, setHeatmap] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setStats(getCompletionStats(range));
    setComparison(getComparisonStats(range));
    setHeatmap(getHeatmapData());
    setTasks(getRecurringTasks());
  }, [range]);

  if (!stats) return null;

  const maxCompleted = Math.max(...stats.dailyStats.map(d => d.completed), 1);

  // Generate Trend Line Points
  const trendPoints = stats.dailyStats.map((d, i) => {
    const x = (i / (stats.dailyStats.length - 1)) * 100;
    const y = 100 - (d.total > 0 ? (d.completed / d.total) * 100 : 0);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="container">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h2>📊 Advanced Analytics</h2>
            <p>Deeper insights into your productivity</p>
          </div>
          <div className="dashboard-controls">
            <select 
              value={range} 
              onChange={(e) => setRange(e.target.value)}
              className="range-selector"
            >
              <option value="week">Weekly View</option>
              <option value="month">Monthly View</option>
              <option value="3months">3 Months View</option>
              <option value="6months">6 Months View</option>
              <option value="year">Yearly View</option>
            </select>
            <button className="back-btn" onClick={() => navigate('/tasks')}>
              ← Back
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <span className="stat-value">{stats.totalCompletions}</span>
              <span className="stat-label">Total Done</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <span className="stat-value">{stats.completionRate}%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
          <div className="stat-card streak">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <span className="stat-value">{stats.streak}</span>
              <span className="stat-label">Current Streak</span>
            </div>
          </div>
          <div className="stat-card longest-streak">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <span className="stat-value">{stats.longestStreak}</span>
              <span className="stat-label">All-time Best</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="dashboard-col">
            {/* Heatmap Section */}
            <div className="chart-container heatmap-container">
              <h3>🔥 Streak Calendar</h3>
              <div className="heatmap-grid">
                {heatmap.map((day, i) => (
                  <div 
                    key={i} 
                    className={`heatmap-cell intensity-${day.intensity}`}
                    title={`${day.date}: ${day.count} tasks`}
                  />
                ))}
              </div>
              <div className="heatmap-legend">
                <span>Less</span>
                <div className="legend-cells">
                  <div className="heatmap-cell intensity-0"></div>
                  <div className="heatmap-cell intensity-1"></div>
                  <div className="heatmap-cell intensity-2"></div>
                  <div className="heatmap-cell intensity-3"></div>
                  <div className="heatmap-cell intensity-4"></div>
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Comparison Section */}
            {comparison && (
              <div className="chart-container comparison-container">
                <h3>⚖️ Period Comparison</h3>
                <div className="comparison-metrics">
                  <div className="comparison-item">
                    <span className="comp-label">Total Completions</span>
                    <div className="comp-values">
                      <span className="curr-val">{comparison.current.total}</span>
                      <span className={`diff-val ${comparison.diff.total >= 0 ? 'pos' : 'neg'}`}>
                        {comparison.diff.total >= 0 ? '↑' : '↓'} {Math.abs(comparison.diff.total)}
                      </span>
                    </div>
                  </div>
                  <div className="comparison-item">
                    <span className="comp-label">Completion Rate</span>
                    <div className="comp-values">
                      <span className="curr-val">{comparison.current.rate}%</span>
                      <span className={`diff-val ${comparison.diff.rate >= 0 ? 'pos' : 'neg'}`}>
                        {comparison.diff.rate >= 0 ? '↑' : '↓'} {Math.abs(comparison.diff.rate)}%
                      </span>
                    </div>
                  </div>
                </div>
                <p className="comp-subtitle">Compared to previous period</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="dashboard-col">
            {/* Trend Line Section */}
            <div className="chart-container trend-container">
              <h3>📊 Completion Trend</h3>
              <div className="trend-svg-wrapper">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="trend-line-svg">
                  <defs>
                    <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(102, 126, 234, 0.4)" />
                      <stop offset="100%" stopColor="rgba(102, 126, 234, 0)" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="url(#trendGradient)"
                    stroke="none"
                    points={`0,100 ${trendPoints} 100,100`}
                  />
                  <polyline
                    fill="none"
                    stroke="#667eea"
                    strokeWidth="2"
                    points={trendPoints}
                  />
                </svg>
              </div>
              <div className="trend-labels">
                <span>{stats.dailyStats[0]?.date}</span>
                <span>{stats.dailyStats[stats.dailyStats.length-1]?.date}</span>
              </div>
            </div>

            {/* Task Breakdown */}
            {tasks.length > 0 && (
              <div className="chart-container breakdown-container">
                <h3>🎯 Task Efficiency</h3>
                <div className="breakdown-list">
                  {tasks.map(task => {
                    const taskCompletions = stats.dailyStats.filter(d => 
                      (task.completionHistory || []).includes(d.date)
                    ).length;
                    const percentage = stats.dailyStats.length > 0 
                      ? Math.round((taskCompletions / stats.dailyStats.length) * 100) 
                      : 0;
                    
                    return (
                      <div key={task.id} className="breakdown-item">
                        <div className="breakdown-info">
                          <span className="breakdown-title">{task.title}</span>
                          <span className="breakdown-stats">{percentage}%</span>
                        </div>
                        <div className="breakdown-bar-bg">
                          <div 
                            className="breakdown-bar-fill"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {tasks.length === 0 && (
          <div className="no-data">
            <p>No daily routines detected. Add some to see your analytics!</p>
            <button className="back-btn" onClick={() => navigate('/repetitive')}>
              Add Routine
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
