import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
            name: {
                        type: String,
                        required: [true, "Name is required"]
            },
            email: {
                        type: String,
                        required: [true, "Email is required"],
                        unique: true
            },
            password: {
                        type: String,
                        required: [true, "Password is required"],
                        select: false
            },
            bio: String,
            avatar: {
                        public_id: String,
                        url: String
            },
            skillsToTeach: {
                        type: [String],
                        default: [] // so it’s never undefined
            },
            skillsToLearn: {
                        type: [String],
                        default: []
            },

}, { timestamps: true });


userSchema.pre("save", async function (next) {
            if (!this.isModified("password")) return next();
            this.password = await bcrypt.hash(this.password, 10);
            next();
});

userSchema.methods.comparePassword = async function (password) {
            return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;
