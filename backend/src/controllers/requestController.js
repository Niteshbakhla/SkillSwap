import asyncHandler from "../middleware/asyncHandler.js";
import Offer from "../models/Offer.js";
import SkillExchangeRequest from "../models/skillExchange.js";
import User from "../models/User.js";
import CustomError from "../utils/customError.js";


export const createOffer = asyncHandler(
            async (req, res) => {
                        const userId = req.user._id;
                        const { teachSkill, learnSkill, description } = req.body;
                        if (!teachSkill || !learnSkill || !description) {
                                    throw new CustomError("All fields are required", 400);
                        }

                        await User.findByIdAndUpdate(userId, { skillsToLearn: learnSkill, skillsToTeach: teachSkill }, { new: true })

                        const offer = await Offer.create({ userId, teachSkill, learnSkill, description })
                        res.status(201).json({ success: true, message: "offer created successfully", offer })
            }
)

export const getOffer = asyncHandler(
            async (req, res) => {
                        const userId = req.user._id;
                        const offers = await Offer.find({ userId: { $ne: userId } }).populate("userId", "name avatar");

                        if (offers.length === 0) {
                                    throw new CustomError("Offer not found", 404);
                        }

                        res.status(200).json({ success: true, offers });
            }
)

export const sendRequest = asyncHandler(
            async (req, res) => {

                        const fromUserId = req.user._id; // sender (logged-in user)
                        const { toUserId, offerId, message } = req.body;
                        if (!toUserId || !offerId) {
                                    throw new CustomError("Fields are required", 400);
                        }
                        const existRequest = await SkillExchangeRequest.findOne({ fromUserId, toUserId })

                        if (!existRequest) {
                                    const request = await SkillExchangeRequest.create({
                                                fromUserId,
                                                toUserId,
                                                offerId,
                                                message
                                    });

                                    res.status(201).json({ success: true, request, message: "Request sent" });
                        } else {
                                    await existRequest.deleteOne();
                                    res.status(200).json({ success: true, message: "Request unsent" });

                        }
            }
)

export const getMyRequests = asyncHandler(
            async (req, res) => {
                        const myId = req.user._id;

                        const sent = await SkillExchangeRequest.find({ fromUserId: myId })
                                    .populate('toUserId', 'name avatar')
                                    .populate('offerId');

                        const received = await SkillExchangeRequest.find({ toUserId: myId })
                                    .populate('fromUserId', 'name avatar')
                                    .populate('offerId');

                        res.status(200).json({
                                    success: true,
                                    sent,
                                    received
                        });
            }
);

export const updateRequestStatus = asyncHandler(
            async (req, res) => {
                        const requestId = req.params.id;
                        const { status } = req.body;

                        if (!["accepted", "declined"].includes(status)) {
                                    throw new CustomError("Invalid status", 400);
                        }

                        const updateRequest = await SkillExchangeRequest
                                    .findByIdAndUpdate(requestId, { status }, { new: true });

                        res.status(200).json({ success: true, request: updateRequest });
            })

