import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = ({ user }) => { //called in App.jsx 
  const navigate = useNavigate(); //when called it is used to redirect the user to given page

  //event handler on event that the user is not logged in that they are redirected to the login page instead of the dashboard
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirects user to login if account credentials is not defined or valid
    }
  }, [user, navigate]);


  //event handler on event that user loggs out in which they are redirected to the home page
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      alert('Logged out successfully');
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out');
    }
  };

  if (!user) {
    return null; 
  }

  //four buttons are created that redirect the user to 3 different pages or logs the user out
  //the pages include creating a schedule, creating a task, or the view page which can give a layout view of users weekly schedule and allow them to add edit or delete data
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {user.firstName}</h1>
      <div style={{ marginTop: '20px' }}>
        <button
          style={{ margin: '10px', padding: '10px 20px' }}
          onClick={() => navigate('/create-schedule')}
        >
          Create Schedule
        </button>
        <button
          style={{ margin: '10px', padding: '10px 20px' }}
          onClick={() => navigate('/create-task')}
        >
          Create Task
        </button>
        <button
          style={{ margin: '10px', padding: '10px 20px' }}
          onClick={() => navigate('/view-schedule-task')}
        >
          View Schedule and Tasks
        </button>
        <button
          style={{ margin: '10px', padding: '10px 20px', backgroundColor: 'red', color: 'white' }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;