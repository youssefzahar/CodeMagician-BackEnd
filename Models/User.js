import mongoose from "mongoose";
const { Schema, model} = mongoose;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
            unique: true
        },
        username: {
            type: String,
            unique: true
        },
        password: {
            type: String,
        },
        otp: {
            type: String,
            required: false,
          },
        isVerified:{
            type: Boolean,
        }
    },
     
    {
        timestamps: true
    }
)

export default model('User',userSchema);