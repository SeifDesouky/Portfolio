const Project = require('../Models/ProjectModel');

const getProject = async (req, res) => {
    const projects = await Project.find();    
    res.status(200).json({data:projects,count:projects.length})
}

const addProject = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(404).json({error:"data not found"})
        }
        const { number, title, description, technologies , viewProject, openProject} = req.body;
        let techArray = [];
        if (Array.isArray(technologies)) {
            techArray = technologies;
        } else if (typeof technologies === 'string') {
            techArray = technologies.replace(/\[|\]/g, '').split(',').map(t => t.trim());
        }
        const projectImg = req.file?.filename;
        const newProject = new Project({
        number,title,description,technologies:techArray,projectImg,viewProject,openProject
    })    
    await newProject.save();
    res.status(200).json(newProject);
    } catch (err) {
        res.status(500).json({message:"something wrong"})
    }
}
const updateProject = async (req, res) => {
    try {
        const { number, title, description, technologies, viewProject, openProject } = req.body;
        let techArray = Array.isArray(technologies)
            ? technologies
            : technologies?.split(',').map(t => t.trim()) || [];

        const updateData = {
            number, title, description, technologies: techArray,
            viewProject, openProject
        };

        if (req.file?.filename) {
            updateData.projectImg = req.file.filename;
        }

        const updated = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json({ message: "Project updated", data: updated });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        res.status(200).json({ message: "Project soft deleted" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


module.exports = { addProject, getProject, updateProject, deleteProject };
