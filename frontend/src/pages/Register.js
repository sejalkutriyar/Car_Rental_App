import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaBuilding } from 'react-icons/fa';

function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'customer' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/car-rental-api/auth/register.php', form);
      if (res.data.success) {
        setMsg('Registered successfully! Please login.');
        setTimeout(() => navigate('/login'), 1500);
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
      <h2 className="auth-title">Create Account</h2>
      {msg && <p className={`status-msg ${msg.toLowerCase().includes('success') ? 'status-success' : 'status-error'}`}>{msg}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="role-picker">
          <button
            type="button"
            className={`role-option ${form.role === 'customer' ? 'role-option-active' : ''}`}
            onClick={() => setForm({...form, role: 'customer'})}
          >
            <span className="role-icon"><FaUser /></span>
            <span>
              <strong>Customer</strong>
              <small>Book and manage your rides</small>
            </span>
          </button>
          <button
            type="button"
            className={`role-option ${form.role === 'agency' ? 'role-option-active' : ''}`}
            onClick={() => setForm({...form, role: 'agency'})}
          >
            <span className="role-icon"><FaBuilding /></span>
            <span>
              <strong>Car Rental Agency</strong>
              <small>Add cars and track bookings</small>
            </span>
          </button>
        </div>
        <input className="input" placeholder="Full Name"
          value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input className="input" placeholder="Email" type="email"
          value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input className="input" placeholder="Password" type="password"
          value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        <button className="btn btn-primary" type="submit">Sign Up</button>
      </form>
      <p className="auth-footnote">
        Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
      </p>
      </motion.div>
    </motion.div>
  );
}

export default Register;