import mongoose from "mongoose";
import bcrypt from "bcrypt";

function checkIfFound(foundUser, res)
{
    if(!foundUser){
        res.statusCode = 404;
        throw new Error('User not found!');
    }
}

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
        pfp: { type: String },
        deactivated: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        },
    },
    { 
        timestamps: true, 
        statics: {
            findByEmail: async function(email) {
                return await this.findOne({ email: email });
            }
        },
        methods: {
            comparePasswords: async function(plainPassword) {
                return (await bcrypt.compare(plainPassword, this.password)) ? true : false;
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