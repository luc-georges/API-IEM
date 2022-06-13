require('dotenv').config();
const cors = require('cors');
const express = require('express');

//MongoDB connection
const mongoose = require('mongoose');
const mongoURL = process.env.DATABASE_URL;
mongoose.connect(mongoURL);
const database = mongoose.connection;

//Routers
const parkingRouter = require('./router/parking')
const ticketRouter = require('./router/ticket')



const app = express();
app.use(cors())
app.use(express.json());


//router
app.use('/parking', parkingRouter); 
app.use('/ticket', ticketRouter); 


//Database connection check
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(process.env.PORT || 8080);

