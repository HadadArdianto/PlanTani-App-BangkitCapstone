const express = require('express');
const { getAllPlant, getPlantById } = require('../controller/plantController');


const router = express.Router();

//menampilkan seluruh tanaman
router.get('/', getAllPlant);

//menampilkan detail tanaman
router.get('/:plantId', getPlantById);

module.exports = router;