import React from 'react';
import ScheduleForm from '../components/ScheduleForm';

//callback function to the scheduleform component
//it is a event handler for when a schedule is successfully created
const CreateSchedulePage = () => {
  const handleScheduleAdded = (schedule) => {
    alert('Schedule created successfully!');
    console.log('New Schedule:', schedule);
  };

  //base schedule page that uses the form page for the bulk of the page. 
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Create Schedule</h1>
      <ScheduleForm onScheduleAdded={handleScheduleAdded} />
    </div>
  );
};

export default CreateSchedulePage;