import React, { useState } from 'react'
import logo from "../images/logo4.png"
import { FaRegEye } from "react-icons/fa";
import { BiSolidUserPin } from "react-icons/bi";
import { PiPhonePlusFill } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'sonner';
import axios from 'axios';
import { backend_uri } from '../config';

const Signup = () => {

    const navigate = useNavigate()
    const [ name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone]  = useState("")
    const [password,setPassword]  = useState("")
    const [error,setError]  = useState("")
    const [isPasswordVisible,issetPasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const  ispasswordVisibleFn = ()=>{
        issetPasswordVisible(!isPasswordVisible)
    }

    const createUser = async (e)=>{
        e.preventDefault() 
        setIsLoading(true)
       try {
        const Bodydata = {name:name,email:email,phone:phone,password:password}
        const response = await axios.post(`${backend_uri}/user/signup`,Bodydata);
        const data = response.data;
        if(data.success) {
            toast.success("Successfully signed up")
            navigate("/signin")
        }
        else{
            setError(data.message)
        }
       } catch (error) {
            if (error.response && error.response.status === 400 || error.response && error.response.status===404) {
                // i want to remove 400 bad request(axios response (as server responded )
              setError(error.response.data.message);
            } else if(error.request){
                console.log(error.request)
            }
            else{
              console.error('An unexpected error occurred:', error);
            }

       }finally{
        setIsLoading(false)
       }
        }
  return (
    <div className='flex items-center justify-center flex-col h-screen bg-[#F0F0F0] p-4'>
        <div className=" w-full flex items-center justify-center mt-16 mr-12">
            <div className="left w-full md:w-[30%] flex flex-col md:ml-[100px]">
            <img className ="w-full h-auto mt-5 rounded-full" src={logo} alt={"logo"} />
                <form onSubmit={createUser} method="post"  className='pl-3 mt-5 '>
            
                    <div className="inputCon">
                        <p className='text-[14-px] text-[gray]'>Name</p>
                        <div className="inputBox">
                            <i><BiSolidUserPin /></i>
                            <input onChange={(e)=>(setName(e.target.value),setError(""))} value={name} type="text" placeholder='Name' name='Name' id='Name' required />
                        </div>
                    </div>

                    <div className="inputCon">
                        <p className='text-[14-px] text-[gray]'>email</p>
                        <div className="inputBox">
                            <i><MdMarkEmailUnread /></i>
                            <input onChange={(e)=>(setEmail(e.target.value),setError(""))}  value = {email} type="email" placeholder='email' name='email' id='email' required />
                        </div>
                    </div>

                    <div className="inputCon">
                        <p className='text-[14-px] text-[gray]'>phone</p>
                        <div className="inputBox">
                            <i><PiPhonePlusFill /></i>
                            <input onChange={(e)=>(setPhone(e.target.value),setError(""))} value={phone} type="phone" placeholder='phone' name='phone' id='phone' required />
                        </div>
                    </div>

                    <div className="inputCon">
                        <p className='text-[14-px] text-[gray]'>password</p>
                        <div className="inputBox">
                            <i><RiLockPasswordFill /></i>
                            <input onChange ={(e)=>(setPassword(e.target.value),setError(""))} value = {password} type={isPasswordVisible?"text":"password"} placeholder='password' name='password' id='password' required />
                           <i className=" cursor-pointer" onClick={ispasswordVisibleFn}>{isPasswordVisible?<FaRegEye />:<FaEyeSlash />}</i>
                        </div>
                    </div>

                    <p className='text-red-400 text-[14px] my-2'>{error}</p>
                    <p className='mt-2'>Already have an account? <Link to ="/signin" className='text-blue-600'>signin</Link></p>
                    <button type="submit"  className="md:w-auto text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">
                        {isLoading?"sigining up..":"signup"}
                    </button>
                </form>
            </div>
           
        </div>
    </div>
  )

}

export default Signup