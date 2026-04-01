import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaCarSide, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';

function Navbar({ theme, onToggleTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Link to="/available-cars" className="navbar-brand"><FaCarSide /> Car Rental</Link>
      <div className="navbar-links">
        <NavLink to="/available-cars" className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}>Available Cars</NavLink>
        {!user && <NavLink to="/login" className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}>Login</NavLink>}
        {!user && <NavLink to="/register" className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}>Register</NavLink>}
        {user?.role === 'agency' && <NavLink to="/add-car" className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}>Add Car</NavLink>}
        {user?.role === 'agency' && <NavLink to="/agency-bookings" className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}>Bookings</NavLink>}
        {user && <span className="navbar-user">Hi, {user.name}</span>}
        <button onClick={onToggleTheme} className="btn btn-theme" title="Toggle theme">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
        {user && <button onClick={handleLogout} className="btn btn-logout"><FaSignOutAlt /> Logout</button>}
      </div>
    </motion.nav>
  );
}

export default Navbar;