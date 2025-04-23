const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const taskRoutes = require('./routes/tasks');
const scheduleRoutes = require('./routes/schedule');
const scheduledTasksRoutes = require('./routes/scheduledTasks');
const authRoutes = require('./routes/auth');

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use('/api/tasks', taskRoutes); 
app.use('/api/schedule', scheduleRoutes);
app.use('/api/scheduledTasks', scheduledTasksRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});