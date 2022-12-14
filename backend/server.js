if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} 

const express = require('express');
// const cors = require('cors')
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express();

// middleware
app.use(express.json());
// app.use(cors())

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT || 4000, () => {
      console.log('listening on port 4000');
    });
  })
  .catch((error) => {
    console.log(error);
  });
