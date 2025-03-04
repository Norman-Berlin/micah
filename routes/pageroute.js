const express = require('express');
const path = require ('path');


const router = express.Router();

router.get('/micah', (reg, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'micah.html'));
});

router.get('/about', (reg, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'about.html'));
});

router.get('/register', (reg, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});


module.exports = router;