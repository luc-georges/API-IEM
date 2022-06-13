const mongoose = require('mongoose');


//Parking Model décrivant le schema utilisé pour l'ajout ou la modification d'un parking
const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: String
    },
    availableSlots: {
        required: true,
        type: Number
    },
    price:{
        type: Map,
        of: new mongoose.Schema({
            freeLengthInMin:{
                required: true,
                type: Number
            },
            pricePerHour:{
                required:true,
                type: Number
            }
        }) 
    }
})

module.exports = mongoose.model('Data', dataSchema)