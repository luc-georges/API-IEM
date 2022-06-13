const mongoose = require('mongoose');

//Parking Model
//_ParkingID: Id of the parking linked to the ticket
//arival: Date the ticket is provided
//departure: Date the ticket has been paid
//paid: true if the ticket have been paid

const dataSchema = new mongoose.Schema({
    _ParkingID: mongoose.Schema.Types.ObjectID,
    arival: {
        required: true,
        type: Date
    },
    departure: {
        required: false,
        type: Date
    },
    paid: {
        required: true,
        type: Boolean,
        default: false
    },

})

module.exports = mongoose.model('Ticket', dataSchema)