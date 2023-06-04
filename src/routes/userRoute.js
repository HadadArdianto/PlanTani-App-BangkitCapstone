const express = require('express');
const {
    createNewUser, 
    loginUser, 
    getAllCategory, 
    getUserById, 
    updateUserById, 
    addMyPlants,
    getMyPlants,
    updatePassword
} = require('../controller/userController');


const router = express.Router();

//register
router.post('/register', createNewUser);

//login
router.post('/login', loginUser);

//home
router.get('/', getAllCategory);

//profile setting
router.get('/users/:userId', getUserById);

//update profile
router.patch('/users/update-profile/:userId', updateUserById);

//menambahkan tanaman ke myPlants
router.post('/users/:userId/add-my-plants', addMyPlants)

//menampilkan semua isi my Plants
router.get('/users/:userId/myplants', getMyPlants)

//update password
router.put('/users/:userId/changepassword', updatePassword)


module.exports = router;