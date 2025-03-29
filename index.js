
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// crear servidor de express
const app = express();

// base de datos
dbConnection();

// cors
app.use(cors());

// directorio público
app.use(express.static('public'));

// lectura y parse del body
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



// escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});