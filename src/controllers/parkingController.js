
const parkingService = require('../services/parkingService')

module.exports = {
    // route GET parking/all  
    // return a list of parkings document
    getAll: async (req, res) => {
    try{
        let parkings = await parkingService.getAll();

        res.status(parkings.status).json(parkings.body)
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
    },
    // route GET parking/:id  
    // return the whole parking object
    getByID: async (req, res) => {
        try{
            let id = req.params.id;
            const data = await parkingService.getByID(id);

            res.status(data.status).json(data.body)

        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
    // route POST parking/add  
    // return the whole parking object
    addNewParking: async (req, res) =>{
        let parkingDot = req.body
        try {

        const addedParking = await parkingService.addNewParking(parkingDot)

            res.status(addedParking.status).json(addedParking.body)
            
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    // route DELETE parking/remove/:id  
    // return a massage as json object containing the deleted document name 
    deleteParking: async (req, res) =>{
        try {
            const id = req.params.id;
            const data = await parkingService.deleteParking(id)

            res.status(data.status).json(data.body)

        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
   
    
}
  