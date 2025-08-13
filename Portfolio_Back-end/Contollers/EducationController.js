const Education = require('../Models/EducationModel');

const getEduction = async (req, res) => {
    const educationContent = await Education.find();
    if (!educationContent) {
        res.status(200).json({message:"Education not found"})
    }
    res.json({data:educationContent})
}

const addEducation = async (req, res) => {
    try {
        const { date, title, description } = req.body;
        const newEduction = new Education({
            date,title,description
        });
        await newEduction.save();
        res.status(200).json({
            data: newEduction,
            message: `Eduction add succssefully`
        })
    } catch (err) {
        res.status(500).json({error:err.message})
    } 
}

const updateEducation = async (req, res) => {
    try {
        const updated = req.body;
        const id = req.params.id;
        const updatedEducation = await Education.findByIdAndUpdate(id, updated,{new:true})
        await updatedEducation.save()
        res.status(200).json({
            data: updatedEducation,
            message:"Education updated successfully"
        })
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

const softDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await Education.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json(err)
    }
}
module.exports = { getEduction, addEducation, updateEducation,  softDelete};