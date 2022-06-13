const express = require('express');
const router = express.Router();

const parking = require('../controllers/parkingController');


router.get('/parking/all',parking.getAll)
router.get('/parking/:id', parking.getByID)


module.exports = router