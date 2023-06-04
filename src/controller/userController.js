const userModels = require('../model/userModel');
const plantModels = require('../model/plantModel');
const bcrypt = require('bcrypt');

//membuat user baru
const createNewUser = async (req, res) => {
  const { name, username, email, password, phoneNumber, locationId } = req.body;

  try {
    // validasi input
    if(!name || !username || !email || !password || !phoneNumber || !locationId){
      return res.status(400).json({ error: "Semua form harus diisi"});
    }

    // Periksa apakah akun pengguna sudah ada berdasarkan username atau email
    const isUserExists = await userModels.checkUserExist(username, email);

    if (isUserExists) {
      return res.status(400).json({ 
        error: 'Username atau Email sudah terdaftar' 
      });
    }
    const userId = await userModels.createUser({ name, username, email, password, phoneNumber, locationId });
    res.status(200).json({
      message: 'Berhasil membuat akun baru',
      data: {
        userId: userId,
        name: name,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        locationId: locationId,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error,
    });
  }
};

//untuk login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  //validasi form input
  if(!username || !password){
    return re.status(400).json({
      error:" Data input tidak lengkap!"
    });
  }

  try {
    //cek username
    const user = await userModels.login(username);
    if(!user){
      return res.status(401).json({ 
        error: 'Username atau Password salah!' 
      });
    }
    //cek password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    // Jika username dan password benar
    if(isPasswordMatch){
      res.status(200).json({ 
        message: 'Berhasil Login', 
        data: {
          username: user.username,
          name : user.name,
        }
      });
    }else{
      res.status(401).json({ 
        error: 'Username atau Password salah!' 
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};


// mendapatkan user berdasarkan ID
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
      const user = await userModels.getUserById(userId);
      if (user) {
          res.status(200).json(user);
      }
  } catch (error) {
      res.status(500).json({
          message: 'Server error',
          serverMessage: error,
      });
  }
}


//update user
const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { name, username, email, phoneNumber, locationId } = req.body;
  try {
    await userModels.updateUserById(userId, {name, username, email, phoneNumber, locationId});
    const updateUser = await userModels.getUserById(userId)
    res.json({
      message: 'UPDATE user success',
      data: updateUser
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      serverMessage: error,
    });
  }
}

//menambahkan tanaman milik user
const addMyPlants = async (req, res) => {
  const { userId } = req.params;
  const { plantId } = req.body;


  try {
    const user = await userModels.getUserById(userId);
    const plant = await plantModels.getPlantById(plantId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    const myPlantId = await userModels.addMyPlants(userId, plantId);

    res.status(200).json({
      message: 'Add plant to my plants success',
      data: {
        myPlantId: myPlantId,
        user: user,
        plant: plant,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

//menampilkan semua Isi myPlants untuk user
const getMyPlants = async (req, res) => {
  const { userId } = req.params;

  try {
    const myPlants = await userModels.getMyPlantsByUserId(userId);

    res.status(200).json({
      message: 'Menampilkan MyPlants success',
      userId : userId,
      data: myPlants.map((plant)=>{
        return{
          plantName: plant.plantName,
          latinPlantName: plant.latinPlantName,
          plantDetail: plant.plantDetail,
          category_id: plant.category_id,
        }
      }),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

//update password
const updatePassword = async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await userModels.getUserById(userId);

    if (!user) {
      return res.status(404).json({ 
        error: 'User tidak ditemukan' 
      });
    }

    // Periksa kecocokan password lama
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ 
        error: 'Old Password salah' 
      });
    }
    // Update password baru
    const isNewPassword = await userModels.updatePassword(userId, newPassword);
    if (isNewPassword) {
      res.status(200).json({
        message: 'Password berhasil diperbaharui',
      });
    } else {
      res.status(500).json({
        message: 'Gagal Update Password',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

//menampilkan semua category
const getAllCategory = async (req, res) => {
  try {
      const [data] = await userModels.getAllCategory();
      res.status(200).json({
          message: 'Get Category success',
          data: data
      });       
  } catch (error) {
      res.status(500).json({
          message: 'Server Error',
          serverMessage: error,
      })
  }
};

module.exports = {
  createNewUser,
  loginUser,
  getUserById,
  updateUserById,
  addMyPlants,
  getMyPlants,
  updatePassword,
  getAllCategory,
};
