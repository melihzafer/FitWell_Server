const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.get("/get", async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      } 
  });

router.post("/post", async (req, res) => {
    try {
        const { title, category, duration } = req.body;
    
        // Create a new workout
        const newWorkout = new Workout({
            title,
            category,
            duration,})
    
        // Save the workout to the database
        await newWorkout.save();
    
        res.status(201).json({ message: 'Workout created successfully', workout: newWorkout });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
  });

module.exports = router;
