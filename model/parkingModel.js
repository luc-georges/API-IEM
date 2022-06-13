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
    totalSlots: {
        required: true,
        type: Number
    },
    price:{

            freeLengthInMin:{
                required: true,
                type: Number
            },
            pricePerHour:{
                required:true,
                type: Number
            }

    }
})

module.exports = mongoose.model('Parking', dataSchema)