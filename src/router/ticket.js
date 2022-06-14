const express = require('express');
const router = express.Router();

const ticket = require('../controllers/ticketController');

//get all tickets
router.get('/all',ticket.getAll)
//get parking by ID
router.get('/:ticketID', ticket.getByID)
//ticket price check
router.get('/priceCheck/:ticketID', ticket.priceCheck)
// car arival provide a new ticket
router.post('/arival', ticket.addNewTicket)
// car departure , paid ticket
router.patch('/departure/:ticketID', ticket.ticketPaid)



module.exports = router