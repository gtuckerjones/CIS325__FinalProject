import React from 'react';
import RegisterForm from '../components/RegisterForm';

//sets the user variable in the registerform
const RegisterPage = ({ setUser }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Register</h1>
      <RegisterForm setUser={setUser} /> 
    </div>
  );
};

export default RegisterPage;