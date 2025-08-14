const express = require('express')
const route = express.Router();
const {addProject,getProject ,updateProject,deleteProject}=require('../Contollers/ProjectController');
const upload = require('../config/upload');


route.get('/getProjects', getProject);
route.post('/',upload.single('projectImg'), addProject);
route.put('/:id', upload.single('projectImg'), updateProject)
route.patch('/:id', deleteProject);
module.exports = route;  