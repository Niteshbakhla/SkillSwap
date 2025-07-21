import mongoose from "mongoose";

const skillExchangeRequestSchema = new mongoose.Schema({
            fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
            status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
            message: { type: String },
}, { timestamps: true }); // adds createdAt and updatedAt

const SkillExchangeRequest = mongoose.model('SkillExchangeRequest', skillExchangeRequestSchema);
export default SkillExchangeRequest;
