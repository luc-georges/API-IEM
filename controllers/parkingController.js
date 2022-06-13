
const parkingModel = require('../model/parkingModel')

module.exports = {
    // route GET parking/all  
    // fetch all data from parkings
    // return a list of parkings document
    getAll: async (req, res) => {
    try{
        let parkings = await parkingModel.find();
        if(parkings.length === 0){
            res.status(404).json({message: "No parking found"})
        }else{
            res.json(parkings)
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
    },
    // route GET parking/:id  
    // fetch specific parking by id
    // return the whole parking object
    getByID: async (req, res) => {
        try{
            const data = await parkingModel.findById(req.params.id);
            if(!data){

                res.status(404).json({message: "No parking found"})

            }else{

                res.json(data)
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    },
    // route POST parking/add  
    // insert a new parking in DB
    // return the whole parking object
    addNewParking: async (req, res) =>{
        let name = req.body.name, 
            location = req.body.location,
            availableSlots = req.body.availableSlots,
            totalSlots = req.body.totalSlots,
            price = req.body.price ;

        //check if parking already exist
        const foundParking = await parkingModel.find({name:name,location:location})

        if(foundParking.length > 0){
            res.status(409).json({message: `${foundParking} already exist in database`})
        }else{

            const data = new parkingModel({
                name: name,
                location: location,
                availableSlots: availableSlots,
                totalSlots: totalSlots,
                price: price
            })
        
            try {
                const dataToSave = await data.save();
                res.status(200).json(dataToSave)
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
        }
    },
    // route DELETE parking/remove/:id  
    // fetch specific parking by id and delete it
    // return a massage as json object containing the deleted document name 
    deleteParking: async (req, res) =>{
        try {
            const id = req.params.id;
            const data = await parkingModel.findByIdAndDelete(id)
            res.status(200).json({message: `Document  ${data.name} has been deleted..`})
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
   
    
}
  