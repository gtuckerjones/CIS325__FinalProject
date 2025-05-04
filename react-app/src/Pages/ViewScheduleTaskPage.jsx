import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const ViewScheduleTaskPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

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

  const handleAddTask = () => {
    navigate('/create-task'); // Redirect to the "Add Tasks" page
  };

  const handleEditTask = async (task) => {
    const newTitle = prompt('Enter new title:', task.title);
    const newDescription = prompt('Enter new description:', task.description);
    const newPriority = prompt('Enter new priority (1 = Low, 2 = Medium, 3 = High):', task.priority);

    if (!newTitle || !newDescription || !newPriority) return;

    try {
      await api.put(`/tasks/${task.id}`, {
        title: newTitle,
        description: newDescription,
        priority: parseInt(newPriority),
        estimated_duration: task.estimated_duration,
        is_complete: task.is_complete,
      });
      setTasks(
        tasks.map((t) =>
          t.id === task.id
            ? { ...t, title: newTitle, description: newDescription, priority: parseInt(newPriority) }
            : t
        )
      );
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleAddSchedule = () => {
    navigate('/create-schedule'); // Redirect to the "Create Schedule" page
  };

  const handleEditSchedule = async (schedule) => {
    const newStartTime = prompt('Enter new start time (HH:MM):', schedule.start_time);
    const newEndTime = prompt('Enter new end time (HH:MM):', schedule.end_time);
    const newDescription = prompt('Enter new description:', schedule.description);

    if (!newStartTime || !newEndTime || !newDescription) return;

    try {
      await api.put(`/schedule/${schedule.id}`, {
        start_time: newStartTime,
        end_time: newEndTime,
        description: newDescription,
      });
      setSchedules(
        schedules.map((s) =>
          s.id === schedule.id
            ? { ...s, start_time: newStartTime, end_time: newEndTime, description: newDescription }
            : s
        )
      );
    } catch (error) {
      console.error('Error editing schedule:', error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await api.delete(`/schedule/${id}`);
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>View Schedule and Tasks</h1>
      {daysOfWeek.map((day, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>{day}</h2>

          {/* Tasks Section */}
          <div>
            <h3>Tasks</h3>
            {tasks
              .filter((task) => task.day_of_week === index)
              .map((task) => (
                <div key={task.id} style={{ marginBottom: '10px' }}>
                  <p>
                    <strong>{task.title}</strong>: {task.description} (Priority: {task.priority})
                  </p>
                  <button onClick={() => handleEditTask(task)}>Edit Task</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete Task</button>
                </div>
              ))}
            <button onClick={handleAddTask}>Add Task</button>
          </div>

          {/* Schedules Section */}
          <div>
            <h3>Schedules</h3>
            {schedules
              .filter((schedule) => schedule.day_of_week === index)
              .map((schedule) => (
                <div key={schedule.id} style={{ marginBottom: '10px' }}>
                  <p>
                    <strong>{schedule.description}</strong>: {schedule.start_time} - {schedule.end_time}
                  </p>
                  <button onClick={() => handleEditSchedule(schedule)}>Edit Schedule</button>
                  <button onClick={() => handleDeleteSchedule(schedule.id)}>Delete Schedule</button>
                </div>
              ))}
            <button onClick={handleAddSchedule}>Add Schedule</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewScheduleTaskPage;