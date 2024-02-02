import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://zwolfe:zwolfe123@fitwell.s9dceec.mongodb.net/"
    );
    console.log("Conected");
  } catch (error) {
    console.log(error.message);
  }
};
