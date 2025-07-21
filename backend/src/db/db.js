import mongoose from "mongoose";
import config from "../config/config.js";

const URL = config.NODE_ENV === "production" ? config.MONGO_PROD_URL : config.MONGO_LOCAL_URL;
const connectDB = async () => {
            try {
                        const connect = await mongoose.connect(URL);
                        if (connect.connection.readyState === 1) {
                                    console.log("Database is connnected!")
                        } else {
                                    console.log("Database is not connected!")
                        }
            } catch (error) {
                        console.log("DB ERROR:", error)
            }
}


export default connectDB;