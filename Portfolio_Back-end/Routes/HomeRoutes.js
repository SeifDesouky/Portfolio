const { getHomeContent, addHomeContent, editHomeContent } = require('../Contollers/homeController')
const express = require('express');
const route = express.Router()
const upload=require('../config/upload')

route.get('/getHome', getHomeContent);
route.post('/addContent', upload.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
]),addHomeContent);
route.patch('/updateHome', upload.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
]),  editHomeContent);
module.exports = route;