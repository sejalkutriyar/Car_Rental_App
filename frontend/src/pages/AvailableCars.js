import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function AvailableCars() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [msg, setMsg] = useState('');
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    axios.get('https://carrentalapk.infinityfreeapp.com/cars/list.php')
      .then(res => setCars(res.data));
  }, []);

  const handleRent = async (car) => {
    if (!user) { navigate('/login'); return; }
    if (user.role === 'agency') { setMsg('Agencies cannot book cars!'); return; }

    const data = bookingData[car.id] || {};
    if (!data.start_date || !data.num_days) {
      setMsg('Please select start date and number of days!');
      return;
    }

    try {
      const res = await axios.post('https://carrentalapk.infinityfreeapp.com/cars/rent.php', {
        car_id: car.id,
        customer_id: user.id,
        start_date: data.start_date,
        num_days: data.num_days
      });
      if (res.data.success) {
        setMsg(`Car booked! Total cost: ₹${res.data.total_cost}`);
        setCars(cars.filter(c => c.id !== car.id));
      } else {
        setMsg(res.data.error);
      }
    } catch (err) {
      setMsg(err.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <motion.div className="page-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="page-title">Available Cars</h2>
      {msg && <p className={`status-msg ${msg.toLowerCase().includes('booked') ? 'status-success' : 'status-error'}`}>{msg}</p>}
      {cars.length === 0 && <p>No cars available right now.</p>}
      <div className="grid-cards">
        {cars.map(car => (
          <motion.div
            key={car.id}
            className="car-card"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            <h3>🚗 {car.vehicle_model}</h3>
            <p><b>Number:</b> {car.vehicle_number}</p>
            <p><b>Seats:</b> {car.seating_capacity}</p>
            <p><b>Rent:</b> ₹{car.rent_per_day}/day</p>

            {user && user.role === 'customer' && (
              <>
                <input type="date" className="input"
                  onChange={e => setBookingData({...bookingData, [car.id]: {...bookingData[car.id], start_date: e.target.value}})} />
                <select className="input"
                  onChange={e => setBookingData({...bookingData, [car.id]: {...bookingData[car.id], num_days: e.target.value}})}>
                  <option value="">Select Days</option>
                  {[1,2,3,4,5,6,7,10,14,30].map(d => (
                    <option key={d} value={d}>{d} day{d>1?'s':''}</option>
                  ))}
                </select>
              </>
            )}

            {user?.role !== 'agency' && (
              <button className="btn btn-secondary" onClick={() => handleRent(car)}>Rent Car</button>
            )}

            {user?.role === 'agency' && (
              <button className="btn btn-accent"
                onClick={() => navigate(`/edit-car/${car.id}`)}>Edit</button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default AvailableCars;