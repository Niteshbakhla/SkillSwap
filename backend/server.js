import app from "./src/app.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./src/socket/index.js";
import { socketMiddleware } from "./src/middleware/socketMiddleware.js";
import config from "./src/config/config.js";


const server = createServer(app)
const io = new Server(server, {
            cors: {
                        origin: config.NODE_ENV === "production" ? "https://skill-swap-lpnt.vercel.app/" : config.LOCAL_HOST,
                        credentials: true,
                        methods: ["GET", "POST"]
            }
});

io.use(socketMiddleware)
setupSocket(io)
server.listen(config.PORT, () => {
            console.log(`Server is listening at port ${config.PORT}`)
})