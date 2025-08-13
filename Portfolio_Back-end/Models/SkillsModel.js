const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
    category: {
        type: String,
        trim: true,
        lowercase:true
    },
    skill: [
        {
            name: {
                type: String,
                trim:true
            },
            img: {
                type: String,
                trim:true 
            }
        } 
    ],
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Skills', SkillSchema);