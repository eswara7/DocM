import React, { useState } from 'react'
import logo from "../images/logo4.png"
import { FaRegEye } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import {FaEyeSlash} from "react-icons/fa"
import { Toaster, toast } from 'sonner'
import { backend_uri } from '../config';
const Signin = () => {

    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword]  = useState("")
    const [error,setError]  = useState("")
    const [isPasswordVisible,setPasswordVisible] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const passwordVisibleFn = ()=>{
        setPasswordVisible(!isPasswordVisible)
    }

    const signinHandler = async (e)=>{
        e.preventDefault();
        setIsLoading(true)
        try{await fetch(`${backend_uri}/user/signin`,{
            mode:"cors",
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email:email,
                password:password})
        }).then(res=>res.json()).then(data=>{
            if(data.success===true){
                localStorage.setItem("token",data.token),
                localStorage.setItem("isLoggedIn",true),
                localStorage.setItem("userId",data.userId)
                toast.success("signed in",{duration:2400})
                navigate("/")
            }
            else{
                setError(data.message)
            }
        })}
        catch(error){
            console.log("sign in error",error)
            setError("an undexpcted error occured")
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <div className='flex items-center justify-center flex-col h-screen bg-[#F0F0F0] p-4'>
        <div className="flex flex-col md:flex-row justify-center items-center w-full ">
            <div className="left w-full md:w-[30%] flex flex-col md:ml-[100px]">
            <img className ="w-full h-auto mt-5 rounded-full" src={logo} alt={"logo"} />
                <form onSubmit={signinHandler} className='pl-3 mt-5 md:pl3'>

                    <div className="inputConEml">
                        <p className='text-[14-px] text-[gray]'>email</p>
                        <div className="inputBox">
                            <i><MdMarkEmailUnread /></i>
                            <input onChange={(e)=>(setEmail(e.target.value),setError(""))}  value = {email} type="email" placeholder='email' name='email' id='email' required />
                        </div>
                    </div>


                    <div className="inputConPwd">
                        <p className='text-[14-px] text-[gray]'>password</p>
                        <div className="inputBox">
                            <i><RiLockPasswordFill /></i>
                            <input onChange ={(e)=>(setPassword(e.target.value),setError(""))} value = {password} type={isPasswordVisible?"text":"password"} placeholder='password' name='password' id='password' required />
                            <i onClick={passwordVisibleFn}>{isPasswordVisible?<FaRegEye/>:<FaEyeSlash />}</i>
                        </div>
                    </div>
                    
                    <p className='text-red-400 text-[14px] my-2'>{error}</p>
                    <p className='mt-2'>don't have an account? <Link to ="/signup" className='text-blue-600'>signup</Link></p>
                    <button type="submit" className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">
                        {isLoading?"signing in...":"signin"}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signin