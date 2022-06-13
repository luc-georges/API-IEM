
const parkingModel = require('../model/parkingModel')

module.exports = {

    getAll: async (req, res) => {
    try{
        let data = await parkingModel.find();
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

    addNewParking: async (req, res) =>{
        let name = req.body.name, 
            location = req.body.location,
            availableSlots = req.body.availableSlots,
            price = req.body.price ;

        //check if parking already exist
        const foundParking = await parkingModel.find({name:name,location:location})
        
        if(foundParking){
            res.status(409).json({message: `${foundParking} already exist in database`})
        }else{

            const data = new parkingModel({
                name: name,
                location: location,
                availableSlots: availableSlots,
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
  