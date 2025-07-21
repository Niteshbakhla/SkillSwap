import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            teachSkill: [{ type: String, required: true }],
            learnSkill: [{ type: String, required: true }],
            description: { type: String },
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
