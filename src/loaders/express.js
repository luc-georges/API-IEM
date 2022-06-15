
const express = require('express');

const cors = require('cors')
const bodyParser = require('body-parser')
//Routers
const parkingRouter = require('../router/parking')
const ticketRouter = require('../router/ticket')

//Middlewares
const auth = require('../middlewares/BasicAuth')

module.exports = async ({ app }) => {

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(auth)
    app.use('/parking', parkingRouter); 
    app.use('/ticket', ticketRouter); 

  // Return the express app
  return app;
}