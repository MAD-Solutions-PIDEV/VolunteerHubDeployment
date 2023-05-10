const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AdminModel = new Schema({
    username: String,
    password: {
        type: String,
        required: false,
    },

    email: {
        type: String,
        required: false,
        trim: true,
        unique: true,
    },


    role: "string",
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Admin', AdminModel)