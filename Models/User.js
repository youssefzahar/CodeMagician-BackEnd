const mongoose = require('mongoose')
const { monitorEventLoopDelay } = require('perf_hooks')
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    user_name: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
}, {timestamps: true} )

const User = mongoose.model('User', userSchema)
module.exports = User