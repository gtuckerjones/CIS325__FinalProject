import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//importing all of the pages and creating references for them
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/registerPage';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import CreateSchedulePage from './Pages/CreateSchedulePage';
import CreateTaskPage from './Pages/CreateTaskPage';
import ViewScheduledTaskPage from './Pages/ViewScheduleTaskPage';

//basically the layout map of the website
const App = () => {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage setUser={setUser} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/create-schedule" element={<CreateSchedulePage />} />
        <Route path="/create-task" element={<CreateTaskPage />} />
        <Route path="/view-schedule-task" element={<ViewScheduledTaskPage />} />
      </Routes>
    </Router>
  );
};

export default App;
