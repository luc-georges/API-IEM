require('dotenv').config({ path: './src/config/.env' });
const cors = require('cors');
const express = require('express');

//MongoDB connection
const mongoose = require('mongoose');
const mongoURL = process.env.DATABASE_URL;
mongoose.connect(mongoURL);
const database = mongoose.connection;

//Routers
const parkingRouter = require('./src/router/parking')
const ticketRouter = require('./src/router/ticket')



const app = express();
app.use(cors())
app.use(express.json());


//router
app.use('/parking', parkingRouter); 
app.use('/ticket', ticketRouter); 



app.listen(process.env.PORT || 8080);

