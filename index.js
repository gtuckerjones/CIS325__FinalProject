const express = require('express');
const app = express();
const PORT = 3000;

const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const scheduleRoutes = require('./routes/schedule');
const scheduledTasksRoutes = require('./routes/scheduledTasks');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use('/api/tasks', taskRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/scheduledTasks', scheduledTasksRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});