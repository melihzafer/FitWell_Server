const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.get("/get", async (req, res) => {
  try {
    // Parse the page query parameter or default to 1
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 6; // Set the number of items per page
    console.log(page)
    // Calculate the skip value based on the page and pageSize
    const skip = (page - 1) * pageSize;
    
    // Fetch workouts with pagination
    const workouts = await Workout.find()
      .skip(skip)
   

    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/post", async (req, res) => {
  try {
    const { title, category, duration, description } = req.body;

    // Create a new workout
    const newWorkout = new Workout({
      title,
      category,
      duration,
      description
    });

    // Save the workout to the database
    await newWorkout.save();
   
    res.status(201).json({ message: 'Workout created successfully', workout: newWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
