
const parkingModel = require('../model/parkingModel')
const ticketModel = require('../model/ticketModel')
module.exports = {

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

    getByID: async (req, res) => {
        try{
            const data = await ticketModel.findById(req.params.id);
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
    priceCheck: async (req, res) => {
        try{
            //récupération des datas du ticket 
            const dataTicket = await ticketModel.findById(req.params.id);
            console.log(dataTicket)
            if(!dataTicket){

                res.status(404).json({message: "No ticket found"})

            }else{
                 //récupération des datas du parking lié au ticket
                const parkingfound = await parkingModel.findById(dataTicket._ParkingID);

                 // calcule du prix par rapport au temps résté
                let ticketStart = dataTicket.arival
                let now = new Date();
                let diff = Math.abs(ticketStart - now);
                var minutes = Math.floor((diff/1000)/60);
                let payingHours = minutes - parkingfound.price.freeLengthInMin +1 ;
                console.log(parkingfound)
                console.log(minutes)
                console.log(payingHours)

                payingHours = Math.ceil(payingHours / 60) 
                console.log(payingHours)
                payingHours *= parkingfound.price.pricePerHour

                //envoie du prix à payer
                res.json({message:`Price to pay: ${payingHours} €`})
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
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
    ticketPaid: async (req, res) => {
        try{
            //récupération des datas du ticket 
            const id = req.params.id
            const updatedData = req.body
            const options = { new: true };
            const foundTicket = await ticketModel.findById(id);

            
            
            if(!foundTicket){

                res.status(404).json({message: "No ticket found"})

            }else if(foundTicket.paid){
                res.status(403).json({message: "This ticket has already been redeemed , you cheecky one ..."})

            }else{
                const dataTicket = await ticketModel.findByIdAndUpdate(id, updatedData, options);
                 //récupération des datas du parking lié au ticket
                const parkingfound = await parkingModel.findById(dataTicket._ParkingID);
                console.log(parkingfound)
                let newAvailable = parkingfound.availableSlots +=1
                parkingfound.availableSlots = newAvailable
                parkingfound.save()

                //envoie du prix à payer
                res.json({message:"Hope to see you again !"})
            }
        }
        catch(error){
            console.log(error)
            res.status(500).json({message: error.message})
        }
    },
    
    
}
  