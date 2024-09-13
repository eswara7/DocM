 import React, { useEffect, useState } from 'react'
 import logo from "../images/logo10.png"
 import { FcSearch } from "react-icons/fc";
 import Avatar from 'react-avatar';
 import { Link, useNavigate } from 'react-router-dom';
import { backend_uri } from '../config';
 const Navbar = () => {
    const [error,setError] = useState("");
    const [query,setQuery] = useState("");
    const [searchResults,setSearchResults] = useState([])
    const [showSearch,setShowSearch] = useState(false)
    const [drawerOpen,setDrawerOpen] = useState(false)
    const [data,setData] = useState([])
    const navigate = useNavigate()

    const getUser = async()=>{
        const token = localStorage.getItem("token")
        await fetch(`${backend_uri}/user/getUser`,{
            mode:"cors",
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`, 
            }
        }).then(res=>res.json()).then((data)=>{
            if(data.success){
                setData(data.user)
            }else{
                setError(data.message)
            }
        })
    }
    const signout = async()=>{
        const token = localStorage.getItem("token")
        fetch(`${backend_uri}/user/signout`,{
            mode:"cors",
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>res.json()).then((data)=>{
                if(data.success){
                    localStorage.removeItem("userId");
                    localStorage.removeItem("token");
                    localStorage.removeItem("isLoggedIn");
                    navigate("/signin")
                }
            })
        
    }
const handleSearch = async(query)=>{
    const token = localStorage.getItem("token")
    console.log(token)
    if(!query){
        return
    }
    await fetch(`${backend_uri}/user/search?query=${query}`,{
        mode:"cors",
        method:"GET",
        headers:{
        "Authorization":`Bearer ${token}`
        }
    }).then(res=>res.json()).then(data=>{
        if(data.success){
            setSearchResults(data.documents)
            setShowSearch(true)
        }else{
            setError(data.message)
            setShowSearch(false)
        }
    })
}
    useEffect(()=>{
        getUser()
    },[])
   return (
    <>
    <div className="navbar sticky top-0 left-0 w-full  shadow-md z-50 flex items-center px-[20px] h-[90px] justify-between bg-[#F4F4F4]">
    <Link to= "/"><img className =" flex items-center w-[20vw]  md:w-[10vw] lg:w-[11vw] " src={logo} alt={"logo"} /></Link>
        <div className="right flex items-center gap-2 ">
            <div className="inputBox w-[29vw] flex items-center border-gray-300 bg-[#D1D5DB] font-bold">
            
               <i className='ml-3'> <FcSearch /></i>
                <input  type="text" onChange={(e)=>{setQuery(e.target.value), handleSearch(e.target.value)}} onFocus={() => handleSearch(query)}
                    onBlur={()=>{setTimeout(() => {
                        setShowSearch(false)
                    }, 100);}}    value={query} placeholder='search..'/>
            </div>
            {showSearch && (
                            <div className="absolute top-full w-96 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[300px]  z-50">
                                {searchResults.length > 0 ? searchResults.map((doc) => (
                                    <Link
                                        key={doc._id}
                                        to={`/create/${doc._id}`}
                                        className="block mb-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 rounded-lg transition-colors duration-300 ease-in-out"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800">{doc.title}</h3>
                                        <p className="text-gray-600 mt-1">{doc.content.length > 100 ? `${doc.content.substring(0, 100)}...` : doc.content}</p>
                                    </Link>
                                )) : <p className="text-gray-500 w-80  h-5 text-center">not found</p>}
                            </div>
                        )}
                <button onClick={()=>{setDrawerOpen(!drawerOpen)} }  onBlur={()=>{setTimeout(() => {
                        setDrawerOpen(false)
                    }, 100);}}>
                    <Avatar  className = "cursor-pointer" name={data?data.name:""} size="40" round={true} />
                </button>
                {drawerOpen && (
            <div className="absolute top-24 right-2 w-80 bg-[#F4F4F4] shadow-lg rounded-lg p-4 z-50 ">

              <h3 className="text-lg font-bold text-gray-900 flex justify-center">Your Details</h3>
              <p className="mt-2 text-gray-800  flex justify-center">Name: {data.name}</p>
              <p className="text-gray-800  flex justify-center">email: {data.email}</p>
             <div className=' flex justify-center mt-3'>
             <a onClick = {()=>{signout()}}  href="#_" className="relative  items-center justify-center inline-block p-4 px-5 py-2 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group">
<span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
<span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
<span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
<span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
</span>
<span className="relative text-white">logout</span>
</a>
             </div>
              </div>
          )}
        </div>
    </div>
    </>
   )
 }
 
 export default Navbar