const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const logger = require('./middleware/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/tasks', tasksRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
