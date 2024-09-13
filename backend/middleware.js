import jwt from "jsonwebtoken"

export const authMiddleWare = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer"))
        return res.status(401).json({success:false,message:"no token provided"})

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else{
            res.status(403).json({})
        }
    } catch (error) {
        return res.status(401).json({success:false,message:"access denied please sign in"})
    }
}