const mongoose = require("mongoose");

const supplementsSchema = new mongoose.Schema({
  name: String,
  type: String,
  brand: String,
  description: String,
  ingredients: [String], 
  dosage: {
    amount: String,
    unit: String,
  },
  packaging: {
    quantity: String,
    unit: String,
  },
  price: {
    amount: Number,
    currency: String,
  },
  usage_instructions: String,
  warnings: [String],
  image_url: String,
});

const Supplement = mongoose.model("Supplements", supplementsSchema);

module.exports = Supplement;
