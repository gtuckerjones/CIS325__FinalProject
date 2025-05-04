import React, { useState } from 'react';
import api from '../api/axios'; //sends data to the backend using axios

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState({ //task holds the user input while set tasks updates the user input
    title: '',
    description: '',
    estimated_duration: '',
    due_date: '',
    priority: 1,
  });

  const handleChange = (e) => { //set task is called and handles user inputs
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', task);
      alert('Task added successfully');
      onTaskAdded(response.data);//adds created task to database
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="estimated_duration"
        placeholder="Estimated Duration (minutes)"
        value={task.estimated_duration}
        onChange={handleChange}
      />
      <input
        type="date"
        name="due_date"
        value={task.due_date}
        onChange={handleChange}
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
      >
        <option value={1}>Low</option>
        <option value={2}>Medium</option>
        <option value={3}>High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;