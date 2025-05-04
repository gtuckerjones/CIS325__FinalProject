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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Weekly Schedule and Tasks</h1>
      <div className="row">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white text-center">
                <h5>{day}</h5>
              </div>
              <div className="card-body">
                <h6 className="text-secondary">Schedules:</h6>
                {schedules
                  .filter((schedule) => schedule.day_of_week === index)
                  .map((schedule) => (
                    <div key={schedule.id} className="mb-2">
                      <p className="mb-1">
                        <strong>{schedule.description}</strong>
                      </p>
                      <p className="text-muted">
                        {schedule.start_time} - {schedule.end_time}
                      </p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleEditSchedule(schedule)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteSchedule(schedule.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                <button className="btn btn-sm btn-success mt-2" onClick={handleAddSchedule}>
                  Add Schedule
                </button>
                <hr />
                <h6 className="text-secondary">Tasks:</h6>
                {tasks
                  .filter((task) => task.day_of_week === index)
                  .map((task) => (
                    <div key={task.id} className="mb-2">
                      <p className="mb-1">
                        <strong>{task.title}</strong>
                      </p>
                      <p className="text-muted">{task.description}</p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                <button className="btn btn-sm btn-success mt-2" onClick={handleAddTask}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewScheduleTaskPage;