import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign:'center', marginTop:'80px' }}>
      <h1>🚗 Welcome to Car Rental Agency</h1>
      <p style={{ fontSize:'18px', color:'#555' }}>Find and rent your perfect car today!</p>
      <Link to="/available-cars">
        <button style={styles.btn}>Browse Available Cars</button>
      </Link>
    </div>
  );
}

const styles = {
  btn: { marginTop:'20px', padding:'12px 30px', fontSize:'16px',
        backgroundColor:'#1a1a2e', color:'white', border:'none',
        borderRadius:'6px', cursor:'pointer' }
};

export default Home;