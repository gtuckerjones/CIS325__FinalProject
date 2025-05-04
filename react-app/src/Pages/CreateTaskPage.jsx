import React from 'react';
import TaskForm from '../components/TaskForm';

//event handler for when a task is successfully created
//callback function to the taskfrom component
const CreateTaskPage = () => {
  const handleTaskAdded = (task) => {
    alert('Task created successfully!');
    console.log('New Task:', task);
  };

  //bulk of the page is just the taskform
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h2>Create Task</h2>
            </div>
            <div className="card-body">
              <TaskForm onTaskAdded={handleTaskAdded} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;