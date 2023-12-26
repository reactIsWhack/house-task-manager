const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const taskRouter = require('./routes/taskRoute');
const errorHandler = require('./middleware/errorHandler');

const PORT = 3000;
const app = express();

// Middleware

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes Middleware

app.use('/api/tasks', taskRouter);

app.use(errorHandler);

// Connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();
