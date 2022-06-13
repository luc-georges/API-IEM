
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
            const dataTicket = await ticketModel.findById(req.params.id);
            const parkingLinker = await parkingModel.findById(dataTicket.id);
            let ticketStart = dataTicket.arival
            console.log(ticketStart.getMinutes())
            let now = new Date();
            if(!dataTicket){

                res.status(404).json({message: "No ticket found"})

            }else{

                res.json(dataTicket)
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
    addNewTicket: async (req, res) =>{
        let _ParkingID = req.body._ParkingID ;

            const data = new ticketModel({
                _ParkingID: _ParkingID,
                arival: new Date().toISOString(),
            })
        
            try {
                const dataToSave = await data.save();
                res.status(200).json(dataToSave)
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
        
    },
    
    
}
  