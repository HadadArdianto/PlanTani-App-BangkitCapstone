const plantModels = require('../model/plantModel');


const getAllPlant = async (req, res) => {
    try {
        const [data] = await plantModels.getAllPlant();
        res.json({
            message: 'Get all Plants success',
            data: data
        });       
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
  };

const getPlantById = async (req, res) => {
    const { plantId } = req.params;
    try {
        const plant = await plantModels.getPlantById(plantId);

        if(plant){
            res.json(plant);
        }else{
            res.status(404).json({
                message: 'Tanaman tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

  module.exports = {
    getAllPlant,
    getPlantById
  }