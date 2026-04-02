import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AddCar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ vehicle_model:'', vehicle_number:'', seating_capacity:'', rent_per_day:'' });
  const [msg, setMsg] = useState('');

  if (!user || user.role !== 'agency') {
    return <h2 className="access-denied">⛔ Access Denied</h2>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/car-rental-api/cars/add.php',
        { ...form, agency_id: user.id });
      if (res.data.success) {
        setMsg('Car added successfully!');
        setTimeout(() => navigate('/available-cars'), 1500);
      } else {
        setMsg(res.data.error);
      }
    } catch {
      setMsg('Something went wrong!');
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
      <h2 className="page-title">Add New Car</h2>
      {msg && <p className={`status-msg ${msg.toLowerCase().includes('success') ? 'status-success' : 'status-error'}`}>{msg}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <input className="input" placeholder="Vehicle Model"
          value={form.vehicle_model} onChange={e => setForm({...form, vehicle_model: e.target.value})} required />
        <input className="input" placeholder="Vehicle Number"
          value={form.vehicle_number} onChange={e => setForm({...form, vehicle_number: e.target.value})} required />
        <input className="input" placeholder="Seating Capacity" type="number"
          value={form.seating_capacity} onChange={e => setForm({...form, seating_capacity: e.target.value})} required />
        <input className="input" placeholder="Rent Per Day (₹)" type="number"
          value={form.rent_per_day} onChange={e => setForm({...form, rent_per_day: e.target.value})} required />
        <button className="btn btn-primary" type="submit">Add Car</button>
      </form>
      </div>
    </div>
  );
}

export default AddCar;