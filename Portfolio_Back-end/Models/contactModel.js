const mongoose = require('mongoose')

const contactPage = new mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type: String,
    },
    msg: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }) 

module.exports = mongoose.model('Contact', contactPage);