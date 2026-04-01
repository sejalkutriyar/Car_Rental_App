import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import AvailableCars from './pages/AvailableCars';
import AgencyBookings from './pages/AgencyBookings';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/add-car" element={<PageTransition><AddCar /></PageTransition>} />
        <Route path="/edit-car/:id" element={<PageTransition><EditCar /></PageTransition>} />
        <Route path="/available-cars" element={<PageTransition><AvailableCars /></PageTransition>} />
        <Route path="/agency-bookings" element={<PageTransition><AgencyBookings /></PageTransition>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <AuthProvider>
      <Router>
        <Navbar theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        <div className="app-shell">
          <AnimatedRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;