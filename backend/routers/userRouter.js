import express from "express";
import { signin, signup,getUser,search, signout, updateUser } from "../controllers/userControllers.js";
import { authMiddleWare } from "../middleware.js";
export const userRouter = express.Router();


userRouter.post("/signup",signup)
userRouter.post("/signin",signin)
userRouter.post("/signout",authMiddleWare,signout)
userRouter.post("/updateUser",authMiddleWare,updateUser)
userRouter.get("/getUser",authMiddleWare,getUser)
userRouter.get("/search",authMiddleWare,search)

