const express = require('express')
const route = express.Router();
const {addProject,getProject}=require('../Contollers/ProjectController');
const upload = require('../config/upload');


route.get('/getProjects', getProject);
route.post('/addProject',upload.single('projectImg'), addProject);

module.exports = route;  