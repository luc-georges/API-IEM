const mongoose = require('mongoose');

//Ticket Model décrivant le schema utilisé pour l'ajout ou la modification d'un ticket

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

})

module.exports = mongoose.model('Ticket', dataSchema)