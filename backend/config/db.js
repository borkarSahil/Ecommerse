import mongoose from "mongoose";

 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase Connected...");
    } catch (error) {
        console.log("MongoDb error: " + error);
    }
}

export default connectDB;