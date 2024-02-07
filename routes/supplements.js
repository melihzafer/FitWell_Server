const express = require("express");
const router = express.Router();
const Supplement = require("../models/Supplements");

router.get("/get", async (req, res) => {
  try {
    // Parse the page query parameter or default to 1
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 6; // Set the number of items per page
    console.log(page);
    // Calculate the skip value based on the page and pageSize
    const skip = (page - 1) * pageSize;

    // Fetch Supplements with pagination
    const Supplements = await Supplement.find().skip(skip);

    res.json(Supplements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/post", async (req, res) => {
  console.log("asd")
  try {
    const {
      name,
      type,
      brand,
      description,
      ingredients,
      dosage,
      packaging,
      price,
      manufacturing_date,
      expiry_date,
      usage_instructions,
      warnings,
      image_url,
    } = req.body;

    // Create a new Supplement
    const newSupplement = new Supplement({
      name,
      type,
      brand,
      description,
      ingredients,
      dosage,
      packaging,
      price,
      manufacturing_date,
      expiry_date,
      usage_instructions,
      warnings,
      image_url,
    });

    // Save the Supplement to the database
    await newSupplement.save();

    res
      .status(201)
      .json({
        message: "Supplement created successfully",
        Supplement: newSupplement,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
