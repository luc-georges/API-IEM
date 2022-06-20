
const parkingModel = require('../models/parkingModel')
const ticketModel = require('../models/ticketModel')

module.exports = {
    // fetch all data from tickets
    // return a list of tickets document
    getAll: async () => {
    try{

        let tickets = await ticketModel.find();

        if(tickets.length === 0){
            return {success: false,status:404, body: "No ticket found", error: "No ticket found"};

        }else{
            return {success: true, status:200, body: tickets, error:null};

        }
    }catch(error){
        return {success: false, status:500, body: "something broke", error:error};
    }
    },

    // fetch specific ticket by id
    // return the whole ticket object
    getByID: async (ticketID) => {
        try{
            const data = await ticketModel.findById(ticketID);
            if(!data){
                return {success: false,status:404, body: "No ticket found", error: "No ticket found"};

            }else{
                return {success: true, status:200, body: data, error:null};

            }
        }
        catch(error){
            return {success: false, status:500, body: "something broke", error:error};
        }
    },

    // fetch specific ticket by id
    // return the price to pay
    priceCheck: async (ticketID) => {
        try{

            const dataTicket = await ticketModel.findById(ticketID);

            if(!dataTicket){

                return {success: false,status:404, body: "No ticket found", error: "No ticket found"};


            }else{

                const parkingfound = await parkingModel.findById(dataTicket._ParkingID);

                 // calculate price depending on the length of the stay
                let ticketStart = dataTicket.arival
                let now = new Date();
                let diff = Math.abs(ticketStart - now);
                let minutes = Math.floor((diff/1000)/60);
                let payingHours = minutes - parkingfound.price.freeLengthInMin +1 ;
                payingHours = Math.ceil(payingHours / 60) 
                payingHours *= parkingfound.price.pricePerHour

                //send price to pay
                return {success: true, status:200, body: `Price to pay: ${payingHours} €`, error:null};
           
            }
        }
        catch(error){
            return {success: false, status:500, body: "something broke", error:error};
        }
    },

    // create a new ticket 
    // reduce "availableSlots" from the linked parking by 1
    // return the whole ticket object
    addNewTicket: async (_ParkingID) =>{
        try {

        const parkingfound = await parkingModel.findById(_ParkingID);
        let availableSlots = parkingfound.availableSlots


        if(!parkingfound){
            return {success: false,status:404, body: "No parking found", error: "No parking found"};


        }
        else if(availableSlots <=0 && parkingfound){
            return {success: true,status:200, body: "Parking is full", error:null};

        }else{

            let newAvailable = parkingfound.availableSlots -=1
            parkingfound.availableSlots = newAvailable
            parkingfound.save()
            const data = new ticketModel({
                _ParkingID: _ParkingID,
                arival: new Date().toISOString(),
            })
        
         
                const dataToSave = await data.save();
                return {success: true, status:200, body: dataToSave, error:null};

            }
        }
            catch (error) {
                return {success: false, status:500, body: "something broke", error:error};

            }
        
        },


    // fetch specific ticket by id
    // set "paid" to true
    // raise "availableSlots" from the linked parking by 1
    // return a "message" with a goodbye sentence
    ticketPaid: async (id, updatedData) => {
        try{

            const options = { new: true };
            const foundTicket = await ticketModel.findById(id);

            if(!foundTicket){

                return {success: false,status:404, body: "ticket not found", error: "ticket not found"};


            }else if(foundTicket.paid){

                return {success: false,status:403, body: "This ticket has already been redeemed , you cheecky one ...", error: "Ticket already paid"};

            }else{

                const dataTicket = await ticketModel.findByIdAndUpdate(id, updatedData, options);
                // fetch linked parking
                const parkingfound = await parkingModel.findById(dataTicket._ParkingID);
                // modify availability
                let newAvailable = parkingfound.availableSlots +=1
                parkingfound.availableSlots = newAvailable
                parkingfound.save()

                
                return {success: true,status:200, body: "Hope to see you again !", error:null};

            }
        }
        catch(error){

            return {success: false, status:500, body: "something broke", error:error};

        }
    },
    
    
}
  