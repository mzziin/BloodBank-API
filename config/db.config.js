import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("connected to database successfully")
    } catch (error) {
        console.log("Error connecting to database: ", error.message)
        process.exit(1)
    }
}

export default connectDb