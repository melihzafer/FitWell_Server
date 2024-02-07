const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.get("/get", async (req, res) => {
  try {
    const id = req.query.id;
    console.log("hello")
    const workout = await Workout.findById(id);
    console.log(workout)
    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;