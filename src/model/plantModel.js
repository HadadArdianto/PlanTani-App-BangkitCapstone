const dbPool = require('../config/database');

const getAllPlant = () => {
    const SQLQuery = "SELECT * FROM plantani_database.plants"

    return dbPool.execute(SQLQuery);
};

//menampilkan plant berdasarkan id
const getPlantById = async (plantId) => {
    const SQLQuery = `SELECT * FROM plants WHERE plant_id = ?`;
    const values = [plantId]
    try {
        const [rows] = await dbPool.execute(SQLQuery, values);
        return rows[0]; // Mengembalikan data tanaman jika ditemukan
      } catch (error) {
        throw error;
      }
    };

module.exports = {
    getAllPlant, 
    getPlantById
};