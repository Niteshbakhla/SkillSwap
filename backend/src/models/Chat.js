import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
            userIds: [
                        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
            ], // usually two users
}, { timestamps: true }); // adds createdAt & updatedAt

export default mongoose.model('Chat', chatSchema);
