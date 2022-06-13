const mongoose = require('mongoose');

//Ticket Model décrivant le schema utilisé pour l'ajout ou la modification d'un ticket

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    starting: {
        required: true,
        type: Date
    },

})

module.exports = mongoose.model('Data', dataSchema)