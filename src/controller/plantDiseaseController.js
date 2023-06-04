const pdModel = require('../model/plantDiseaseModel');

//menampilkan semua plant disease
const getAllPlantDiseases = async (req, res) => {
    try {
        const [data] = await pdModel.getAllPlantDiseases();
        res.status(200).json({
            message: 'GET all plantdiseases success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        })
    }
}

//menampilkan detail plant disease
const getPlantDiseasesById = async (req, res, ) => {
    const { plantDiseaseId } = req.params;
    try {
        const plantDisease = await pdModel.getPlantDiseasesById(plantDiseaseId);
        if (plantDisease) {
        res.status(200).json(plantDisease);
    }
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        })
    }
}



module.exports = {
    getAllPlantDiseases,
    getPlantDiseasesById,
}