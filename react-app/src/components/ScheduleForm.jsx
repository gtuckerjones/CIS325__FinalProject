import React, { useState } from 'react';
import api from '../api/axios';

const ScheduleForm = ({ onScheduleAdded }) => {
  const [schedule, setSchedule] = useState({ //schedule holds the user's input while setSchedule updates the selected field
    day_of_week: '', //initialized as an empty string
    start_time: '',
    end_time: '',
    description: '',
  });

  const handleChange = (e) => { //same handle change logic. setSchedule is called and updates schedule field as user inputs
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/schedule', schedule);
      alert('Schedule added successfully');
      onScheduleAdded(response.data); //input data is added to the database
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add schedule');
    }
  };

  //html format for create schedule form. uses drop down list for selected day of the week
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Schedule</h2>
      <select
        name="day_of_week"
        value={schedule.day_of_week}
        onChange={handleChange}
        required
      >
        <option value="">Select Day</option>
        <option value={0}>Sunday</option>
        <option value={1}>Monday</option>
        <option value={2}>Tuesday</option>
        <option value={3}>Wednesday</option>
        <option value={4}>Thursday</option>
        <option value={5}>Friday</option>
        <option value={6}>Saturday</option>
      </select>
      <input
        type="time"
        name="start_time"
        value={schedule.start_time}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="end_time"
        value={schedule.end_time}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={schedule.description}
        onChange={handleChange}
      />
      <button type="submit">Add Schedule</button>
    </form>
  );
};

export default ScheduleForm;