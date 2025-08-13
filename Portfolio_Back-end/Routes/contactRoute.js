const express = require('express');
const route = express.Router();
const { getMsgs, addMsg, softDelete}=require('../Contollers/contactController')


route.get('/', getMsgs);
route.post('/', addMsg);
route.patch('/:id', softDelete);
module.exports=route 