import React from 'react';

const View = ({ schedules, tasks, onAdd, onEdit, onDelete }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  //used copilot for this section
  //but basically it displays the tasks and schedules fields together in a weekly based format 
  //it allows the user to edit/delete and add into a specific dat of the week
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Weekly Schedule</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {daysOfWeek.map((day, index) => (
          <div key={index} style={{ border: '1px solid black', padding: '10px', width: '150px' }}>
            <h3>{day}</h3>
            <div>
              <h4>Schedules:</h4>
              {schedules
                .filter((schedule) => schedule.day_of_week === index)
                .map((schedule) => (
                  <div key={schedule.id}>
                    <p>{schedule.description}</p>
                    <button onClick={() => onEdit('schedule', schedule)}>Edit</button>
                    <button onClick={() => onDelete('schedule', schedule.id)}>Delete</button>
                  </div>
                ))}
            </div>
            <div>
              <h4>Tasks:</h4>
              {tasks
                .filter((task) => task.day_of_week === index)
                .map((task) => (
                  <div key={task.id}>
                    <p>{task.title}</p>
                    <button onClick={() => onEdit('task', task)}>Edit</button>
                    <button onClick={() => onDelete('task', task.id)}>Delete</button>
                  </div>
                ))}
            </div>
            <button onClick={() => onAdd(index)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;