import { useNavigate } from 'react-router-dom';
import { logout, getUser } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>Task Tracker</h2>
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
