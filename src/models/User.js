import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { excludeV, includeUserFields } from "../config/mongoConfig.js";

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
            select: false
        },
        pfp: { type: String },
        deactivated: {
            type: Boolean,
            default: false
        },
        refreshToken: { 
            type: String,
            select: false
        },
    },
    {
        timestamps: true,
        statics: {
            findByEmail: async function(email) {
                return await this.findOne({ email: email })
                    .select(includeUserFields);
            }
        },
        methods: {
            comparePasswords: async function(plainPassword) {
                return await bcrypt.compare(plainPassword, this.password);
            }
        }
    }
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