import zod from 'zod'

const signupBodySchema = zod.object({
    name:zod.string().min(2,{message:"name should atleast contain 2 characters"}),
    email:zod.string().email(),
    password:zod.string().min(8,{message:"password should atleast be 8 characters long"}).regex(/[a-z]/,{message:"password should atleast contain one lowercase letter"}).regex(/[A-Z]/,{message:"password should atleast contain one uppercase letter"}).regex(/[0-9]/,{message:"password should alteast have one number"}),
    phone: zod.string()
})
const signinBodySchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(8,{message:"password shouldt atleast be 8 characters long"}).regex(/[a-z]/,{message:"password should atleast contain one lowercase letter "}).regex(/[A-Z]/,{message:"password should atleast contain one uppercase letter "}).regex(/[0-9]/,{message:"password should atleast have one number"}),
})
const updateBodySchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(8,{message:"password shouldt atleast be 8 characters long"}).regex(/[a-z]/,{message:"password should atleast contain one lowercase letter "}).regex(/[A-Z]/,{message:"password should atleast contain one uppercase letter "}).regex(/[0-9]/,{message:"password should atleast have one number"}),
    name:zod.string()
})

export{signupBodySchema,signinBodySchema,updateBodySchema}