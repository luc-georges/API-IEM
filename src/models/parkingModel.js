const mongoose = require('mongoose');


//Parking Model
//name: name of the place
//location: address of the parking
//availableSlots: number of remaining slots
//totalSlots: nomber of total Slots built in the parking
//freeLengthInMin: time length where the parking is free 
//pricePerHour: price the customer will have to pay once the free periode is expired

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