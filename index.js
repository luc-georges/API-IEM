require('dotenv').config();
const cors = require('cors');
const express = require('express');

const mongoose = require('mongoose');
const mongoURL = process.env.DATABASE_URL;
mongoose.connect(mongoURL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})


const app = express();
app.use(cors())
app.use(express.json());






app.listen(process.env.PORT || 8080);

