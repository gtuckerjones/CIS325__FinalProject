//Set up an express server 
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
//routes
const taskRoutes = require('./routes/tasks');
const scheduleRoutes = require('./routes/schedule');
const scheduledTasksRoutes = require('./routes/scheduledTasks');
const authRoutes = require('./routes/auth');

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use('/api/tasks', taskRoutes); //Handles CRUD operations for tasks
app.use('/api/schedule', scheduleRoutes); //Handles CRUD operations for schedule
app.use('/api/scheduledTasks', scheduledTasksRoutes);
app.use('/api/auth', authRoutes);//Handles CRUD operations for authentication

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});