import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import View from '../components/View';

//similarly from the view.jsx I used my copilot to help create this file
//but it basically consist of a bunch of event handlers that allow the user to view, add, edit, and delete tasks
//this page definitely needs to be refined and checked for potential bugs
//this is mostly a placeholder that i will hopefully come back to.

const ViewScheduleTaskPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchSchedules();
    fetchTasks();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await api.get('/schedule');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAdd = async (dayOfWeek) => {
    const description = prompt('Enter schedule description:');
    if (!description) return;

    try {
      const response = await api.post('/schedule', { day_of_week: dayOfWeek, description });
      setSchedules([...schedules, response.data]);
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  const handleEdit = async (type, item) => {
    const newDescription = prompt('Enter new description:', item.description || item.title);
    if (!newDescription) return;

    try {
      if (type === 'schedule') {
        await api.put(`/schedule/${item.id}`, { ...item, description: newDescription });
        setSchedules(
          schedules.map((schedule) =>
            schedule.id === item.id ? { ...schedule, description: newDescription } : schedule
          )
        );
      } else if (type === 'task') {
        await api.put(`/tasks/${item.id}`, { ...item, title: newDescription });
        setTasks(
          tasks.map((task) =>
            task.id === item.id ? { ...task, title: newDescription } : task
          )
        );
      }
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      if (type === 'schedule') {
        await api.delete(`/schedule/${id}`);
        setSchedules(schedules.filter((schedule) => schedule.id !== id));
      } else if (type === 'task') {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>View Schedule and Tasks</h1>
      <View
        schedules={schedules}
        tasks={tasks}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ViewScheduleTaskPage;