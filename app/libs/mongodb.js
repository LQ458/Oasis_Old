import mongoose from "mongoose";

export default async function DBconnect() {
  try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const DBclose = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};
