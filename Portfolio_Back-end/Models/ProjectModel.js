const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    number: String,
    title: String,
    description: String,
    technologies: [String],
    projectImg: String,
    viewProject: String,
    openProject:String
}) 

module.exports = new mongoose.model('Project', ProjectSchema);