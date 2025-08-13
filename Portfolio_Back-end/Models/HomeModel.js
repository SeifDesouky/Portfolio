const mongoose = require('mongoose')

const HomePage = new mongoose.Schema({
    logo:String,
    title: {
        type: String,
        maxlingth: 50
    },
    subTitle: {
        type: String,
        maxlingth:70
    },
    description: {
        type: String,
        maxlingth:500
    },
    cv:String,
    profileImg:String,
    linkdin: String,
    github: String,
    instagram: String,
    facebook: String,
},
{timestamps:true})

module.exports = mongoose.model("Home",HomePage);