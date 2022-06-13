
const parkingModel = require('../model/parkingModel')
const ticketModel = require('../model/ticketModel')
module.exports = {
    // route GET ticket/all  
    // fetch all data from tickets
    // return a list of tickets document
    getAll: async (req, res) => {
    try{
        let data = await ticketModel.find();
        if(data.length === 0){
            res.status(404).json({message: "No parking found"})
        }else{
            res.json(data)
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
    },
    // route GET ticket/:ticketID  
    // fetch specific ticket by id
    // return the whole ticket object
    getByID: async (req, res) => {
        try{
            const data = await ticketModel.findById(req.params.ticketID);
            if(!data){

                res.status(404).json({message: "No ticket found"})

            }else{

                res.json(data)
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
    // route GET ticket/priceCheck/:ticketID  
    // fetch specific ticket by id
    // return the price to pay
    priceCheck: async (req, res) => {
        try{

            const dataTicket = await ticketModel.findById(req.params.ticketID);

            if(!dataTicket){

                res.status(404).json({message: "No ticket found"})

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
                res.json({message:`Price to pay: ${payingHours} €`})
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
    // route POST ticket/arival
    // create a new ticket 
    // reduce "availableSlots" from the linked parking by 1
    // return the whole ticket object
    addNewTicket: async (req, res) =>{
        try {

        let _ParkingID = req.body._ParkingID ;
        const parkingfound = await parkingModel.findById(_ParkingID);
        let availableSlots = parkingfound.availableSlots


        if(!parkingfound){
            res.status(404).json({message:"Parking not found"})

        }
        else if(availableSlots <=0 && parkingfound){
            res.status(200).json({message:"Parking is full"})
        }else{

            let newAvailable = parkingfound.availableSlots -=1
            parkingfound.availableSlots = newAvailable
            parkingfound.save()
            const data = new ticketModel({
                _ParkingID: _ParkingID,
                arival: new Date().toISOString(),
            })
        
         
                const dataToSave = await data.save();
                res.status(200).json(dataToSave)
            }
        }
            catch (error) {
                res.status(400).json({message: error.message})
            }
        
        },

    // route PATCH ticket/departure/:ticketID
    // fetch specific ticket by id
    // set "paid" to true
    // raise "availableSlots" from the linked parking by 1
    // return a "message" with a goodbye sentence
    ticketPaid: async (req, res) => {
        try{

            const id = req.params.ticketID
            const updatedData = req.body
            const options = { new: true };
            const foundTicket = await ticketModel.findById(id);

            if(!foundTicket){

                res.status(404).json({message: "No ticket found"})

            }else if(foundTicket.paid){

                res.status(403).json({message: "This ticket has already been redeemed , you cheecky one ..."})

            }else{

                const dataTicket = await ticketModel.findByIdAndUpdate(id, updatedData, options);
                // fetch linked parking
                const parkingfound = await parkingModel.findById(dataTicket._ParkingID);
                // modify availability
                let newAvailable = parkingfound.availableSlots +=1
                parkingfound.availableSlots = newAvailable
                parkingfound.save()

                res.json({message:"Hope to see you again !"})
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
    
    
}
  