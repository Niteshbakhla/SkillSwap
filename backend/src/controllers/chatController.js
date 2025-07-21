import asyncHandler from "../middleware/asyncHandler.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import SkillExchangeRequest from "../models/skillExchange.js";
import CustomError from "../utils/customError.js";

export const createChat = asyncHandler(
            async (req, res) => {
                        const { userId } = req.body; // other user's id
                        const myId = req.user._id;

                        // check if chat already exists
                        let existingChat = await Chat.findOne({ userIds: { $all: [myId, userId] } });
                        if (existingChat) {
                                    return res.status(200).json({ success: true, chat: existingChat });
                        }

                        const newChat = await Chat.create({ userIds: [myId, userId] });
                        res.status(201).json({ success: true, chat: newChat });

                        res.status(500).json({ success: false, message: error.message });

            }
);

export const getMyChats = asyncHandler(
            async (req, res) => {
                        const myId = req.user._id;
                        const chats = await Chat.find({ userIds: myId }).populate('userIds', 'name avatar');
                        if (!chats) {
                                    throw new CustomError("Chat not found", 404);
                        }
                        res.status(200).json({ success: true, chats });
            }
)


export const sendMessage = asyncHandler(
            async (req, res) => {
                        const { recieverId, text } = req.body;
                        const senderId = req.user._id;

                        const newMessage = await Message.create({
                                    recieverId,
                                    senderId,
                                    text
                        });

                        res.status(201).json({ success: true, message: newMessage });
            }
);


export const getMessagesByChat = asyncHandler(
            async (req, res) => {
                        const { id: receiverId } = req.params;
                        const senderId = req.user._id
                        const messages = await Message.find({
                                    $or: [
                                                { senderId, receiverId },
                                                { senderId: receiverId, receiverId: senderId }
                                    ]
                        })


                        if (!messages.length === 0) {
                                    throw new CustomError("No message found", 404);
                        }
                        res.status(200).json({ success: true, messages });
            }
);


export const getUserChats = asyncHandler(
            async (req, res) => {
                        const userId = req.user._id?.toString(); // ensure string for comparison

                        if (!userId) {
                                    throw new CustomError("Missing userId", 400);
                        }

                        const requests = await SkillExchangeRequest.find({
                                    status: "accepted",
                                    $or: [
                                                { fromUserId: userId },
                                                { toUserId: userId }
                                    ]
                        }).populate("toUserId", "name")  // only populate name
                                    .populate("fromUserId", "name");

                        if (requests.length === 0) {
                                    throw new CustomError("Not found", 404);
                        }

                        // Transform each request: add `otherUser`
                        const transformed = requests.map(req => {
                                    const reqObj = req.toObject(); // convert to plain JS object

                                    let otherUser;
                                    if (reqObj.fromUserId._id.toString() === userId) {
                                                otherUser = reqObj.toUserId;
                                    } else {
                                                otherUser = reqObj.fromUserId;
                                    }

                                    return {
                                                _id: reqObj._id,
                                                offerId: reqObj.offerId,
                                                status: reqObj.status,
                                                createdAt: reqObj.createdAt,
                                                updatedAt: reqObj.updatedAt,
                                                otherUser
                                    };
                        });

                        res.status(200).json({ success: true, requests: transformed });
            }
)
