
const ticketService = require('../services/ticketService')

module.exports = {
    // route GET ticket/all  
    // return a list of tickets document
    getAll: async (req, res) => {
    try{

        let tickets = await ticketService.getAll()

        if(tickets.success){
            res.json(tickets)
        }else{
            res.status(tickets.status).json(tickets.error)
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

            const ticketID = req.params.ticketID

            const ticket = await ticketService.getByID(ticketID);
            if(ticket.success){
                res.json(ticket)
            }else{
                res.status(ticket.status).json(ticket.error)

            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
    // route GET ticket/priceCheck/:ticketID  
    // return the price to pay
    priceCheck: async (req, res) => {
        try{
            const ticketID = req.params.ticketID;
            const dataTicket = await ticketService.priceCheck(ticketID);

            if(dataTicket.success){
                res.json(dataTicket)
                
            }else{
                res.status(dataTicket.status).json(dataTicket.error)
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
    // route POST ticket/arival
    // return the whole ticket object
    addNewTicket: async (req, res) =>{
        try {

        let _ParkingID = req.body._ParkingID ;
        const data = await ticketService.addNewTicket(_ParkingID);

        if(data.success){
            res.json(data)

        }
        else{
                res.status(data.status).json(data.error)
            }
        }
            catch (error) {
                res.status(500).json({message: error.message})
            }
        
        },

    // route PATCH ticket/departure/:ticketID
    // return a "message" with a goodbye sentence
    ticketPaid: async (req, res) => {
        try{

            const id = req.params.ticketID
            const updatedData = req.body

            const data = await ticketService.ticketPaid(id,updatedData);

            if(data.success){

                res.json(data)

            }else{

                res.status(data.status).json(data.error)

            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
    
    
}
  