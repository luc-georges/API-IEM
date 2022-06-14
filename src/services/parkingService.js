
const parkingModel = require('../models/parkingModel')

module.exports = {

    // fetch all data from parkings
    // return a list of parkings document
    getAll: async () => {
    try{
        let parkings = await parkingModel.find();
        if(parkings.length === 0){
            return {success: false,status:404, body: "No parking found", error: "No parking found"};
        }else{
            return {success: true, status:200, body: parkings, error:null};
        }
    }catch(error){

        return {success: false, status:500, body: "something broke", error:error};

    }
    },

    // fetch specific parking by id
    // return the whole parking object
    getByID: async (id) => {
        try{
            const data = await parkingModel.findById(id);
            if(!data){

                return {success: false,status:404, body: "No parking found",error: "No parking found"};

            }else{
                return {success: true,status:202, body: data, error: null};

            }
        }
        catch(error){

        return {success: false, status:500, body: "something broke", error:error};

        }
    },

    // insert a new parking in DB
    // return the whole parking object
    addNewParking: async (parkingDot) =>{
        try {
            let{ name, location, availableSlots,totalSlots,price } = parkingDot
        //check if parking already exist
        const foundParking = await parkingModel.find({name:name,location:location})

        if(foundParking.length > 0){
            return {success: false,status:409, body: `${foundParking} already exist in database`, error: `${foundParking} already exist in database`};

        }else{

            const data = new parkingModel({
                name: name,
                location: location,
                availableSlots: availableSlots,
                totalSlots: totalSlots,
                price: price
            })
        
                const dataToSave = await data.save();
                return {success: true,status:200, body: dataToSave, error: null};

            }
        }
            catch (error) {
                return {success: false, status:500, body: "something broke",error:error};

            }
    },

    // fetch specific parking by id and delete it
    // return a massage as json object containing the deleted document name 
    deleteParking: async (id) =>{
        try {
            const data = await parkingModel.findByIdAndDelete(id)
            return {success: true,status:200, body: data, error: null};

        }
        catch (error) {
            return {success: false, status:500, body: "something broke",error:error};


        }
    }
   
    
}
  