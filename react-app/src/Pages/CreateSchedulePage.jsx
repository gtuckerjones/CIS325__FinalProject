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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h2>Create Schedule</h2>
            </div>
            <div className="card-body">
              <ScheduleForm onScheduleAdded={handleScheduleAdded} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSchedulePage;