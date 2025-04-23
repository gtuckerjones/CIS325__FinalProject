import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

//HomePage that contains a welcome header and only two buttons that redirect the user to register or login based on which button they choose
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Schedule App</h1>
      <div style={{ marginTop: '20px' }}>
        <button
          style={{ marginRight: '10px', padding: '10px 20px' }}
          onClick={() => navigate('/register')}
        >
          Register
        </button>
        <button
          style={{ padding: '10px 20px' }}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;