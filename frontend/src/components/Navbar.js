import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          Trading Journal
        </Link>
        {user && (
          <div className="navbar-menu">
            <Link to="/" className="navbar-link">
              Dashboard
            </Link>
            <Link to="/trades" className="navbar-link">
              Trades
            </Link>
            <Link to="/trading-rules" className="navbar-link">
              Trading Rules
            </Link>
            <Link to="/analytics" className="navbar-link">
              Analytics
            </Link>
            <div className="navbar-user">
              <span className="navbar-username">{user.username}</span>
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
