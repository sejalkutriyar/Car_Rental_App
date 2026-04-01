import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

function EditCar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ vehicle_model:'', vehicle_number:'', seating_capacity:'', rent_per_day:'' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get('https://carrentalapk.infinityfreeapp.com/cars/list.php')
      .then(res => {
        const car = res.data.find(c => c.id === parseInt(id));
        if (car) setForm(car);
      });
  }, [id]);

  if (!user || user.role !== 'agency') {
    return <h2 className="access-denied">⛔ Access Denied</h2>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://carrentalapk.infinityfreeapp.com/cars/edit.php',
        { ...form, id });
      if (res.data.success) {
        setMsg('Car updated!');
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
      <h2 className="page-title">Edit Car</h2>
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
        <button className="btn btn-primary" type="submit">Update Car</button>
      </form>
      </div>
    </div>
  );
}

export default EditCar;