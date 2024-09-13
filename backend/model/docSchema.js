import mongoose from "mongoose";
const docSchema = mongoose.Schema({
    title:String,
    content:{
        type:String,
        default:""
    },
    uploadedBy:String,
    date:{
     type:Date,
     default:Date.now
    },
    lastUpdate:{
        type:Date,
        default:Date.now
    },
/*     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    } */

});
const docModel = mongoose.model("Doc",docSchema)
export{docModel}
