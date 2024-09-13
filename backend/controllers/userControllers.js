import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import { signinBodySchema, signupBodySchema, updateBodySchema } from "../zodValidation.js";
import { userModel } from "../model/userSchema.js";
import { docModel } from "../model/docSchema.js";

//await bcrypt.compare(password, hash);
const saltRounds = 15;

dotenv.config();


const signup = async (req,res)=>{
  // let {username,name,email,phone,password} = req.body;
   const isValid = signupBodySchema.safeParse(req.body)
 
   if(!isValid.success){
      // return res.status(400).json({success:false,message:`invalid inputs${isValid.error}`})
       return res.status(401).json({success:false,message:"invalid inputs"})
   }
   try {
     let emailExist = await userModel.findOne({email:req.body.email})
     let phoneExist = await userModel.findOne({phone:req.body.phone})
     if(emailExist){
         return res.status(400).json({success:false,message:"email already exist"})
     }
     else if(phoneExist){
       return res.status(400).json({success:false,message:'phone already exist'})
     }
     else{
       const hashedPassword = await bcrypt.hash(req.body.password,saltRounds)
       const newUser = await userModel.create({
         name:req.body.name,
         email:req.body.email,
         phone:req.body.phone,
         password:hashedPassword
       })
         const userId = newUser._id;
         const token =jwt.sign({userId},process.env.JWT_SECRET)
         return res.status(200).json({success:true,message:"user created successfully",token:token})
     }
     
   } catch (error) {
     return res.status(500).json({success:false,message:"error creating user"})
   }
  
 }
const signin = async(req,res)=>{
    const isValid = signinBodySchema.safeParse(req.body)
    if(!isValid.success){
      return res.status(400).json({success:false,message:"invalid credentials"})
    }

  let user;
  try {
    user = await userModel.findOne({email:req.body.email})
    if(!user){
      return res.status(404).json({success:false,message:"user not found"})
    }}
    catch(error){
        return res.status(500).json({success:false,message:"server error"})
    }
  const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
  if(isPasswordCorrect){
      const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
      return res.status(200).json({success:true,message:"login successful",userId:user._id,token:token})
  }else{
    res.status(400).json({success:false,message:"invalid password"})
  }
}
const updateUser = async(req,res)=>{
  const isValid = updateBodySchema.safeParse(req.body);
  if(!isValid.success){
    return res.status(400).json({success:false,message:"invalid inputs"})
  }
  await userModel.updateOne({_id:req.userId},req.body)
  return res.status(200).json({success:true,message:"updated successfully"})
}

const signout = async(req,res)=>{
  let user = await userModel.findById(req.userId)
  try {
    if(user){
      return res.status(200).json({success:true,message:"you're signed out"})
    }
  } catch (error) {
    console.log(error)
    return res.status(404).json({success:false,message:"user doesnt exist"})
  }
}

const getUser = async(req,res)=>{
  let user = await userModel.findById(req.userId)
  try {
      if(user){
        return res.status(200).json({success:true,message:"user fetched",user:user})
      }
  } catch (error) {
    console.log(error); 
    return res.status(404).json({success:false,message:"something went wrong"})

  }
}

const search = async(req,res)=>{
  let {query} = req.query;
  try {
    let user = await userModel.findById(req.userId)
    if(user){
      let documents = await docModel.find({
        uploadedBy:req.userId,
        $or:[
          {title:{$regex:query,$options:'i'}},
          {content:{$regex:query,$options:'i'}}
        ]
      });
      res.status(200).json({success:true,message:"searched",documents})
    }else{
      return res.json({success:false,message:"user not found"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"search failed"})
  }
}

//router.options('/generate', cors());

export{
  signup,
  signin,
  signout,
  updateUser,
  getUser,
  search
};
