function DailyProgress({ completed, total }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="daily-progress">
      <svg className="progress-ring" width="100" height="100">
        <circle
          className="progress-ring-bg"
          stroke="#e2e8f0"
          strokeWidth="8"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="progress-ring-fill"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease'
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
      </svg>
      <div className="progress-text">
        <span className="progress-count">{completed}/{total}</span>
        <span className="progress-label">today</span>
      </div>
    </div>
  );
}

export default DailyProgress;
