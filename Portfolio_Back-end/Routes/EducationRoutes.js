const express = require('express');
const route = express.Router();
const { getEduction, addEducation, updateEducation , softDelete}=require('../Contollers/EducationController')


route.get('/getEducation', getEduction);
route.post('/addEducation', addEducation);
route.patch('/updateEducation/:id', updateEducation)
route.patch('/deleteEducation/:id', softDelete);
module.exports=route 