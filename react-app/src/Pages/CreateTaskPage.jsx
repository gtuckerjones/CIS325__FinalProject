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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Create Task</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
    </div>
  );
};

export default CreateTaskPage;