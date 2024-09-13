import { userModel } from "../model/userSchema.js";
import { docModel } from "../model/docSchema.js";

const create = async(req,res)=>{
    let {title} = req.body;
    let user = await userModel.findById(req.userId)
    if(user){
      let doc = await docModel.create({
        uploadedBy:req.userId,
        title:title
      }); 
      return res.status(200).json({
        success:true,message:"document created successfulluy",docId:doc._id
      })
    }
    else{
      return res.status(401).json({success:false,message:"invalid user"})
    }
}

const updateDoc = async(req,res)=>{
    let {docId,content} = req.body;
    let user = await userModel.findById(req.userId)
    if(user){
      let doc = await docModel.findByIdAndUpdate(docId,{content:content})
      return res.status(200).json({success:true,message:"document updated"})
    }
    else{
      return res.status(404).json({success:false,message:"invalid user"})
    }
  }

const getDoc = async(req,res)=>{
    let {docId} = req.query;
    let user = await userModel.findById(req.userId);
    if(user){
      let doc = await docModel.findById(docId)
      if(doc){
        return res.status(200).json({success:true,message:"document retrieved",doc:doc})
      }
      else{
        return res.status(500).json({success:false,message:"invalid user"})
      }
    }
  }


const deleteDoc = async(req,res)=>{
    let {docId} = req.body;
    let user = await userModel.findById(req.userId)
    if(user){
      let doc = await docModel.findByIdAndDelete(docId);
      return res.status(200).json({success:true,message:"document deleted from database"})
    }else{
      return res.status(404).json({success:true,message:"invalid user "})
    }
  }
const getAllDocs = async(req,res)=>{
    let user = await userModel.findById(req.userId)
    if(user){
      let docs = await docModel.find({uploadedBy:req.userId}).sort({lastUpdate:-1})
      return res.status(200).json({success:true,message:"document fetched",docs:docs})
    }
    else{ 
      return res.status(401).json({success:false,message:"user not found"})
    }
  }


  export { create, updateDoc, getDoc, deleteDoc, getAllDocs };
  