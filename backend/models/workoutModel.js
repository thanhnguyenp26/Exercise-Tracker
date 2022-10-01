const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      min: 0,
    },
    load: {
      type: Number,
      min: 0,
    },

    km: {
      type: Number,
      min: 0,
    },

    heartrate: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workout', workoutSchema);
