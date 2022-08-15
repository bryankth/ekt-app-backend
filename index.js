const express = require('express');
const { dbConnection } = require('./db/config')
const cors = require('cors')
require('dotenv').config();


//Servidor de express
const app = express();


dbConnection();

app.use(cors())

//Directorio publico
app.use( express.static('public') )

//Parse
app.use( express.json() )

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));



//escuchas peticiones
app.listen(process.env.PORT, () => console.log(`servidor corriendo en el puerto ${process.env.PORT}`))