import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const RegisterForm = ({ setUser }) => { //setUser is passed in RegisterPage.jsx
  const [formData, setFormData] = useState({ //'formData' is the data field that the user is inputting into while 'setFormData' updates the the 'formData' state
    firstName: '', //'firstName' is initialized to an empty string
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();//when called upon is used to redirect the user

  //calls setFormData to update the formData state when a user is typing into the given field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/auth/register', formData);
        console.log('Register response:', response.data); // Debugging
        setUser(response.data.user); //sets the users data
        alert(response.data.message);//gives user success or error message
        navigate('/dashboard');//redirects user to dashboard
    } catch (error) {
        console.error('Register error:', error.response?.data || error.message); // Debugging
        alert(error.response?.data?.error || 'Registration failed');
    }
  };

  //html format form for the register page
  //calls the handleSubmit 
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;