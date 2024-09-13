import express from "express";
import {create,updateDoc,getDoc,deleteDoc,getAllDocs} from "../controllers/docControllers.js";
import { authMiddleWare } from "../middleware.js";
export const docRouter = express.Router();

docRouter.post("/create",authMiddleWare,create)
docRouter.post("/updateDoc",authMiddleWare,updateDoc)
docRouter.get("/getDoc",authMiddleWare,getDoc)
docRouter.post("/deleteDoc",authMiddleWare,deleteDoc)
docRouter.get("/getAllDocs",authMiddleWare,getAllDocs)

