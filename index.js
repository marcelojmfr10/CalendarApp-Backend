const path = require('path');
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

// esto es porque express intenta entrar a la url en el navegador
// cualquier ruta que no esté definida antes, se sirve el contenido estático
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});