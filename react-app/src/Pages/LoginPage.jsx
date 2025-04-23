import React from 'react';
import LoginForm from '../components/LoginForm';

//sets the user variable in the login form and the bulk of the page is from the loginform which is called upon
const LoginPage = ({ setUser }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <LoginForm setUser={setUser} /> 
    </div>
  );
};

export default LoginPage;