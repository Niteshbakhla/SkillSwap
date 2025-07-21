import io from "socket.io-client"

const socket = io(`https://skillswap-6weo.onrender.com`,
            {
                        withCredentials: true,
            }
)

export default socket;