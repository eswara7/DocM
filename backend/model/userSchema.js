import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true,
    minLength:8
   },
   phone:String,
   date:{
    type:Date,
    default:Date.now
   }
   /* docs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"docModel"
   }] 
   ya i know we can use populate get these with userid but i prefer uploaded by*/

})
const userModel = mongoose.model("userModel",userSchema)

export{userModel}
