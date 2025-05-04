import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

//HomePage that contains a welcome header and only two buttons that redirect the user to register or login based on which button they choose
return (
  <div className="container text-center mt-5">
    <h1 className="mb-4">Schedule App</h1>
    <div className="d-flex justify-content-center gap-3">
      <button
        className="btn btn-primary"
        onClick={() => navigate('/register')}
      >
        Register
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </div>
  </div>
);
};

export default HomePage;