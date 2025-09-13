import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function(next) {
    let salt;
    if(this.isModified('password')){
        salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    if(this.isModified('refreshToken')){
        salt = await bcrypt.genSalt(10);
        this.refreshToken = await bcrypt.hash(this.refreshToken, salt);
    }
    next();
});

const User = mongoose.model("users", userSchema);

export default User;