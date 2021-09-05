const express = require('express');
const users = require('./routes/user');
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();


// conectando la base de datos 


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => console.log('Conectando a mongoDb...'))
.catch( err => console.log('No se puedo conecatar a mongo por el siguiente error:', err));




// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use('/api' , users);
const port = process.env.PORT || 5000; // port 


app.listen(port, ()=> {
    try {
        console.log(`El servidor esta corriendo en el puerto ${port}`);
    } catch (err) {
        console.log(err)
    }
});