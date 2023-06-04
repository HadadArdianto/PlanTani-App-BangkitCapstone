const dbPool = require("../config/database");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

//membuat akun user
const createUser = async (userData) => {
  const { name, username, email, password, phoneNumber, locationId } = userData;
  const userId = uuidv4(); //untuk generate userId
  const hashedPass = await bcrypt.hash(password, 10);
  const SQLQuery =
    "INSERT INTO users (user_id, name, username, email, password, phoneNumber, location_id) VALUES (?,?, ?, ?, ?, ?, ?)";
  const values = [userId, name, username, email, hashedPass, phoneNumber, locationId];

  try {
    const [result] = await dbPool.execute(SQLQuery, values);
    return result.insertId; // Mengembalikan ID user yang baru dibuat
  } catch (error) {
    throw error;
  }
};

//check akun apakah sudah ada atau belum
const checkUserExist = async (username, email) => {
  const SQLQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
  const values = [username, email];

  try {
    const [rows] = await dbPool.execute(SQLQuery, values);
    return rows.length > 0; // Mengembalikan nilai true jika akun pengguna sudah ada
  } catch (error) {
    throw error;
  }
};

//cek user berdasarkan username dan password
const login = async (username) => {
  const SQLQuery = "SELECT * FROM users WHERE username = ?";
  const values = [username];

  try {
    const [rows] = await dbPool.execute(SQLQuery, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// menampilkan user berdasarkan ID
const getUserById = async (userId) => {
  const SQLQuery = `SELECT * FROM users WHERE user_id=?`;
  const values = [userId];

  try {
    const [rows] = await dbPool.execute(SQLQuery, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

//update user data
const updateUserById = async (userId, userData) => {
  const { name, username, email, phoneNumber, locationId } = userData;
  const SQLQuery =
    "UPDATE users SET name = ?, username = ?, email = ?,phoneNumber = ?, location_id = ? WHERE user_id = ?";
  const values = [name, username, email, phoneNumber, locationId, userId];
  try {
    await dbPool.execute(SQLQuery, values);
  } catch (error) {
    throw error;
  }
};

//menambahkan tanaman milik user
const addMyPlants = async (userId, plantId) => {
  const generateHash = async (data) =>{
    try {
      const hash = await bcrypt.hash(data.toString(),10);
      return hash;
    } catch (error) {
      throw error;
    }
  }
  const hashMyPlants = await generateHash(userId.toString() + plantId.toString());
  const SQLQuery = "INSERT INTO myplants (myplant_id, user_id, plant_id) VALUES (?, ?, ?)";
  const values = [hashMyPlants , userId, plantId];

  try {
    const [result] = await dbPool.execute(SQLQuery, values);
    return result.insertId; // Mengembalikan ID myplant yang baru ditambahkan
  } catch (error) {
    throw error;
  }
};

//menampilkan semua Isi myPlants untuk user
const getMyPlantsByUserId = async (userId) => {
  const SQLQuery = `
  SELECT mp.user_id, p.*
    FROM myplants mp
    JOIN plants p ON mp.plant_id = p.plant_id
    WHERE mp.user_id = ?
  `;
  const values = [userId];

  try {
    const [rows] = await dbPool.execute(SQLQuery, values);
    return rows;
  } catch (error) {
    throw error;
  }
};

//merubah password
const updatePassword = async (userId, newPassword) => {
  const hashedPass = await bcrypt.hash(newPassword, 10);
  const SQLQuery = 'UPDATE users SET password = ? WHERE user_id = ?';
  const values = [hashedPass, userId];

  try {
    const [result] = await dbPool.execute(SQLQuery, values);
    return result.affectedRows > 0; //return true jika berhasil
  } catch (error) {
    throw error;
  }
}

//menampilkan semua category untuk homescreen
const getAllCategory = () => {
  const SQLQuery = "SELECT * FROM plantani_database.categories";

  return dbPool.execute(SQLQuery);
};

module.exports = {
  createUser,
  checkUserExist,
  login,
  getUserById,
  updateUserById,
  addMyPlants,
  getMyPlantsByUserId,
  updatePassword,
  getAllCategory,
};
