const { getAllSkills, createCategory,addSkillToCategory,updateSkill, softDeleteSkillCategory } = require('../Contollers/SkillsController')
const express = require('express');
const route = express.Router();

route.get('/getSkills', getAllSkills);
route.post('/createCategory', createCategory);
route.post('/:category/addSkill',addSkillToCategory)
route.put('/:id', updateSkill)
route.patch('/:id', softDeleteSkillCategory);
module.exports = route;