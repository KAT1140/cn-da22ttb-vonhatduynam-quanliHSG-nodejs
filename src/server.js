const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from client
app.use(express.static(path.join(__dirname, 'client/dist')));

// API Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/students', require('./src/routes/studentRoutes'));
app.use('/api/teachers', require('./src/routes/teacherRoutes'));
app.use('/api/teams', require('./src/routes/teamRoutes'));
app.use('/api/scores', require('./src/routes/scoreRoutes'));
app.use('/api/evaluations', require('./src/routes/evaluationRoutes'));
app.use('/api/schedules', require('./src/routes/scheduleRoutes'));
app.use('/api/statistics', require('./src/routes/statisticsRoutes'));

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});