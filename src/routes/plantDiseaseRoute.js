const express = require('express');
const { getAllPlantDiseases, getPlantDiseasesById } = require('../controller/plantDiseaseController');


const router = express.Router();

// menampilkan semua plant disease
router.get('/', getAllPlantDiseases);

// menampilkan detail Plant Disease
router.get('/:plantDiseaseId', getPlantDiseasesById);

module.exports = router;