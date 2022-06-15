const express = require('express');
const router = express.Router();

const parkingController = require('../controllers/parkingController');

//get all parkings
router.get('/all',parkingController.getAll)
//get parking by ID
router.get('/:id', parkingController.getByID)
// add a new parking
router.post('/add', parkingController.addNewParking)
//remove a parking by ID
router.delete('/remove/:id', parkingController.deleteParking)


module.exports = router