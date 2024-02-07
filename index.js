const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const workoutRoute = require("./routes/workout");
const workoutByIdRoute = require("./routes/workoutbyid");
const supplementsRoute = require("./routes/supplements.js");
const supplementByIdRoute = require("./routes/suppelementbyid.js");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://zwolfe:zwolfe123@fitwell.s9dceec.mongodb.net/"
    );
    console.log("Conected");
  } catch (error) {
    console.log(error.message);
  }
};

connectMongoDB();

app.use("/auth", authRoutes);
app.use("/workoutbyid", workoutByIdRoute);
app.use("/workout", workoutRoute);
app.use("/supplements", supplementsRoute);
app.use("/supplementbyid", supplementByIdRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
