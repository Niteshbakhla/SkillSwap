import Message from "../models/Message.js";

export const setupSocket = (io) => {
            io.on("connection", (socket) => {
                        const userId = socket.userId?.id
                        socket.join(userId)

                        socket.on("sendMessage", async ({ receiverId, text }) => {

                                    const message = await Message.create({ senderId: userId, receiverId, text })
                                    console.log(message)
                                    // emit to receiver

                                    io.to(receiverId).emit('receiveMessage', message);
                                    // io.to(userId).emit("receiveMessage", message);
                        })
                        socket.on('disconnect', () => {
                                    console.log('User disconnected:', socket.id);
                        });
            })

}