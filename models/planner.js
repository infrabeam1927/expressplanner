const mongoose=require('mongoose')

const plannerSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required:true
    }
    
})

module.exports=mongoose.model('Planner',plannerSchema);
