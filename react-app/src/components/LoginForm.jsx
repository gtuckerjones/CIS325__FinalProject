import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; //sends HTTP requests to backend 

const LoginForm = ({ setUser }) => { //setUser is passed in LoginPage.jsx
  const [email, setEmail] = useState(''); //'email' holds user input while 'setEmail' updates the input. it is initialized as an empty string
  const [password, setPassword] = useState(''); //sets password with user input 'setPassword'
  const navigate = useNavigate(); //used to redirect user when called upon after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password }); //sends a POST request to /auth/login which validates the credentials
      console.log('Login response:', response.data); // Debugging
      setUser(response.data.user); //sets the logged in user so that their information can be loaded
      alert(response.data.message); //gives user logged in message or error message
      navigate('/dashboard'); //redirects logged in user to dashboard
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message); // Debugging
      alert(error.response?.data?.error || 'Login failed');
    }
  };
//form layout for login page
//calls handles onSubmit 
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;