const express = require('express');
const router = express.Router();

const parking = require('../controllers/parkingController');

//get all parkings
router.get('/all',parking.getAll)
//get parking by ID
router.get('/:id', parking.getByID)
// add a new parking
router.post('/add', parking.addNewParking)
//remove a parking by ID
router.delete('/remove/:id', parking.deleteParking)


module.exports = router