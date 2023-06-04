require('dotenv').config()
const PORT = process.env.PORT || 5000
const express = require('express');
const userRoutes = require('./routes/userRoute');
const plantRoutes = require('./routes/plantRoute');
const plantDiseaseRoutes = require('./routes/plantDiseaseRoute');
const middlewareLogRequest = require('./middleware/logs');
const app = express();

app.use(middlewareLogRequest);
app.use(express.json());
app.use('/', userRoutes);
app.use('/plants', plantRoutes);
app.use('/plant-disease', plantDiseaseRoutes);



app.listen(PORT, () => {
    console.log(`Server berhasil running di PORT ${PORT}`);
});