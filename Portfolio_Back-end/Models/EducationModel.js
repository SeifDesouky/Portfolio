const mongoose = require('mongoose')

const EducationPage = new mongoose.Schema({
    date: {
        type:String
    },
    title: {
        type: String,
        maxlength:100
    },
    description: {
        type: String,
        maxlength:500
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }) 

module.exports = mongoose.model('Education', EducationPage);