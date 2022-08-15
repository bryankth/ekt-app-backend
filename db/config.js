const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('Base de datos en línea');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse con la base de datos')
    }
}
module.exports = {
    dbConnection
}