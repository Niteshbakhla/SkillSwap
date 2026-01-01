import io from "socket.io-client"
// https://skillswap-6weo.onrender.com
const socket = io(import.meta.env.VITE_API_URL,
            {
                        withCredentials: true,
            }
)

export default socket;