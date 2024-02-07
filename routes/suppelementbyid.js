const express = require("express");
const router = express.Router();
const Supplement = require("../models/Supplements");

router.get("/get", async (req, res) => {
  try {
    const id = req.query.id;

    const supplement = await Supplement.findById(id);
    console.log(supplement)
    res.json(supplement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;