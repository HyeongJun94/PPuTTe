const express = require('express');
const router = express.Router();

router.get('/lobby',function(req,res){
    res.send('Hello world')
})