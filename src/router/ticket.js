const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController');

//get all tickets
router.get('/all',ticketController.getAll)
//get parking by ID
router.get('/:ticketID', ticketController.getByID)
//ticket price check
router.get('/priceCheck/:ticketID', ticketController.priceCheck)
// car arival provide a new ticket
router.post('/arival', ticketController.addNewTicket)
// car departure , paid ticket
router.patch('/departure/:ticketID', ticketController.ticketPaid)



module.exports = router