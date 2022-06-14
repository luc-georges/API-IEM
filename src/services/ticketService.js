
const parkingModel = require('../models/parkingModel')
const ticketModel = require('../models/ticketModel')

module.exports = {
    // fetch all data from tickets
    // return a list of tickets document
    getAll: async () => {
    try{

        let parkings = await ticketModel.find();

        if(parkings.length === 0){
            return {success: false,status:404, error: "No ticket found"};
        }else{
            return {success: true, body: parkings};
        }
    }catch(error){
        return {success: false, status:500, error: "something broke"};
    }
    },
    // route GET ticket/:ticketID  
    // fetch specific ticket by id
    // return the whole ticket object
    getByID: async (ticketID) => {
        try{
            const data = await ticketModel.findById(ticketID);
            if(!data){
                return {success: false,status:404, error: "No ticket found"};
            }else{
                return {success: true, body: data};
            }
        }
        catch(error){
            return {success: false, status:500, error: "something broke"}
        }
    },
    // route GET ticket/priceCheck/:ticketID  
    // fetch specific ticket by id
    // return the price to pay
    priceCheck: async (ticketID) => {
        try{

            const dataTicket = await ticketModel.findById(ticketID);

            if(!dataTicket){

                return {success: false,status:404, error: "No ticket found"};

            }else{

                const parkingfound = await parkingModel.findById(dataTicket._ParkingID);

                 // calculate price depending on the length of the stay
                let ticketStart = dataTicket.arival
                let now = new Date();
                let diff = Math.abs(ticketStart - now);
                var minutes = Math.floor((diff/1000)/60);
                let payingHours = minutes - parkingfound.price.freeLengthInMin +1 ;
                payingHours = Math.ceil(payingHours / 60) 
                payingHours *= parkingfound.price.pricePerHour

                //send price to pay
                return {success: true, body: `Price to pay: ${payingHours} €`};
           
            }
        }
        catch(error){
            return {success: false, status:500, error: "something broke"}
        }
    },
    // route POST ticket/arival
    // create a new ticket 
    // reduce "availableSlots" from the linked parking by 1
    // return the whole ticket object
    addNewTicket: async (_ParkingID) =>{
        try {

        const parkingfound = await parkingModel.findById(_ParkingID);
        let availableSlots = parkingfound.availableSlots


        if(!parkingfound){
            return {success: false,status:404, error: "Parking not found"};

        }
        else if(availableSlots <=0 && parkingfound){
            return {success: true, body: "Parking is full"};

        }else{

            let newAvailable = parkingfound.availableSlots -=1
            parkingfound.availableSlots = newAvailable
            parkingfound.save()
            const data = new ticketModel({
                _ParkingID: _ParkingID,
                arival: new Date().toISOString(),
            })
        
         
                const dataToSave = await data.save();
                return {success: true, body: dataToSave};

            }
        }
            catch (error) {
                return {success: false, status:500, error: "something broke"}

            }
        
        },

    // route PATCH ticket/departure/:ticketID
    // fetch specific ticket by id
    // set "paid" to true
    // raise "availableSlots" from the linked parking by 1
    // return a "message" with a goodbye sentence
    ticketPaid: async (id, updatedData) => {
        try{

            const options = { new: true };
            const foundTicket = await ticketModel.findById(id);

            if(!foundTicket){

                return {success: false,status:404, error: "Parking not found"};


            }else if(foundTicket.paid){

                return {success: false,status:403, error: "This ticket has already been redeemed , you cheecky one ..."};

            }else{

                const dataTicket = await ticketModel.findByIdAndUpdate(id, updatedData, options);
                // fetch linked parking
                const parkingfound = await parkingModel.findById(dataTicket._ParkingID);
                // modify availability
                let newAvailable = parkingfound.availableSlots +=1
                parkingfound.availableSlots = newAvailable
                parkingfound.save()
                return {success: true, body: "Hope to see you again !"};

            }
        }
        catch(error){

            return {success: false,status:500, error: "something broke"};

        }
    },
    
    
}
  