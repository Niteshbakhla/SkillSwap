import { config } from "dotenv"
config();

const _config = {
            PORT: process.env.PORT,
            MONGO_LOCAL_URL: process.env.MONGO_LOCAL_URL,
            MONGO_PROD_URL: process.env.MONGO_PROD_URL,
            JWT_SECRET: process.env.JWT_SECRET,
            NODE_ENV: process.env.NODE_ENV,
            JWT_EXPIRE: process.env.JWT_EXPIRE,
            LOCAL_HOST: process.env.LOCAL_HOST,
            CLIENT_URL: process.env.CLIENT_URL
}

export default Object.freeze(_config);