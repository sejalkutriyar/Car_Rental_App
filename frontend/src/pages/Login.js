import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [msg, setMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://carrentalapk.infinityfreeapp.com/auth/login.php', form);
      if (res.data.success) {
        login(res.data.user);
        navigate('/available-cars');
      } else {
        setMsg(res.data.error);
      }
    } catch {
      setMsg('Something went wrong!');
    }
  };

  return (
    <motion.div className="auth-wrap" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <motion.div className="auth-card" whileHover={{ y: -2 }}>
      <h1 className="welcome-title">🚗 Welcome to Car Rental Agency</h1>
      <p className="welcome-subtitle">Find and rent your perfect car today!</p>
      <h2 className="auth-title">Sign In →</h2>
      {msg && <p className={`status-msg ${msg.toLowerCase().includes('success') ? 'status-success' : 'status-error'}`}>{msg}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <input className="input" placeholder="Email" type="email"
          value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input className="input" placeholder="Password" type="password"
          value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        <button className="btn btn-primary" type="submit">Sign In →</button>
      </form>
      <p className="auth-footnote">
        Don't have an account? <Link to="/register" className="auth-link">Sign Up</Link>
      </p>
      </motion.div>
    </motion.div>
  );
}

export default Login;