const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  title: String,
  category: String,
  duration: String,
  description: String,
});

const Workout = mongoose.model("Workouts", workoutSchema);

module.exports = Workout;
