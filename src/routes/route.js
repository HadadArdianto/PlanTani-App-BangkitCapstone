const express = require('express');
const {createNewUser, loginUser, getAllCategory} = require('../controller/userController');


const router = express.Router();

//register
router.post('/register', createNewUser);

//login
router.post('/login', loginUser);

//home
router.get('/', getAllCategory);



module.exports = router;