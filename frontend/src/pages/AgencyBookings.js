import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

function AgencyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.role === 'agency') {
      axios.get(`https://carrentalapk.infinityfreeapp.com/booking/agency_view.php?agency_id=${user.id}`)
        .then(res => setBookings(res.data));
    }
  }, [user]);

  if (!user || user.role !== 'agency') {
    return <h2 className="access-denied">⛔ Access Denied</h2>;
  }

  return (
    <motion.div className="page-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="page-title">All Bookings</h2>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Car</th>
            <th>Vehicle No.</th>
            <th>Start Date</th>
            <th>Days</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.customer_name}</td>
              <td>{b.customer_email}</td>
              <td>{b.vehicle_model}</td>
              <td>{b.vehicle_number}</td>
              <td>{b.start_date}</td>
              <td>{b.num_days}</td>
              <td>₹{b.total_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </motion.div>
  );
}

export default AgencyBookings;