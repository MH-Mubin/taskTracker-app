import { useLocation, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <h2>Task Tracker</h2>
      <div className="navbar-center">
        <button 
          className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}
          onClick={() => navigate('/tasks')}
        >
          📋 Tasks
        </button>
        <button 
          className={`nav-link ${isActive('/repetitive') ? 'active' : ''}`}
          onClick={() => navigate('/repetitive')}
        >
          🔄 Daily
        </button>
        <button 
          className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          📊 Dashboard
        </button>
      </div>
      <div className="navbar-right">
        <span className="user-email">{user}</span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
