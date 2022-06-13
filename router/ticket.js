const express = require('express');
const router = express.Router();

const ticket = require('../controllers/ticketController');

//get all tickets
router.get('/all',ticket.getAll)
//get parking by ID
router.get('/:id', ticket.getByID)
//ticket price check
router.get('/priceCheck/:id', ticket.priceCheck)
// car arival provide a new ticket
router.post('/arival', ticket.addNewTicket)
// car departure , paid ticket
router.patch('/departure/:id', ticket.ticketPaid)



module.exports = router