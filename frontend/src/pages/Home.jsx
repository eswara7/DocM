import React, { useState,useRef, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { GoPlus } from "react-icons/go";
import Docs from '../components/Docs';
import { MdTitle } from "react-icons/md";
import { Toaster,toast } from 'sonner';

import { useNavigate } from 'react-router-dom';
import { backend_uri } from '../config';

const Home = () => {
  const [isCreateModelShow,setCreateModelShow] = useState(false)
  const [title,setTitle] = useState("");
  const [error,setError] = useState("");
  const [data, setData] = useState([]);

  const titleRef = useRef(null)
  const navigate = useNavigate()

  const createDoc = async()=>{
    if(title===""){
        setError("please enter title")
        toast.warning("enter title",{duration:2400})
        return;
    }
    setError("")
    try {
        const response = await fetch(`${backend_uri}/docs/create`,{
          mode:"cors",
          method:'POST',
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          },
          body:JSON.stringify({
            title:title,
          })
        })
        const data = await response.json()
        if(data.success){
          toast.success("Document created",{duration:2500})
          setCreateModelShow(false);
          navigate(`/create/${data.docId}`);
        }else{
          toast.error(data.message || "Failed to create document")
        }
    } catch (error) {
        console.log(error);
        toast.error("error while creating the document")
    }
  }

  const getData = async()=>{
    const token = localStorage.getItem("token")
    const response = await fetch(`${backend_uri}/docs/getAllDocs`,{
      mode:"cors",
      method:"GET",
       headers:{
        "Authorization":`Bearer ${token}`,
      }
    })
    const data=await response.json();
    if(data.success){
      setData(data.docs)
    }else{
      toast.error(data.message || "Failed to fetch documents");
    }
  }

  const handleDelete=(id)=>{
    setData(data.filter(doc=>doc._id!=id))
  }
  
  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{
    if(isCreateModelShow&&titleRef.current){
        titleRef.current.focus();
    }
  },[isCreateModelShow])

  return (
      <>
      <Toaster richColors position='bottom-center'  />
      <Navbar/>
      
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16 mt-10">
        <h3 className='text-xl md:text-3xl mb-3 pl-2.5'>all documents</h3>
        <button onClick={()=>{setCreateModelShow(true)}} type="button" className="text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center">
          <i className='mr-1'><GoPlus/></i>
          create doc
        </button>
      </div>
      <div className="px-4 md:px-8 lg:px-16 mt-4">
       {data.map((item)=>{
          return(
             <Docs key = {item._id} docs={item} onDelete={handleDelete}/>
          )
        })
       }
      </div>
       {
        isCreateModelShow?<>
        <div className="createDoccont fixed inset-0 bg-black/30 w-screen h-screen flex flex-col items-center justify-center">
        <div className="createDocsModel p-4 md:p-6 lg:p-8 bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
          <h3 className='text-lg md:text-xl lg:text-2xl mb-4'>New Document</h3>
          <div className="inputCont mt-1 ">
            <p className='text-sm text-gray-600 mb-1'>Title</p>
            <div className='inputBox flex items-center border border-gray-300 rounded-md p-2'>
               <i className='text-lg mr-2'><MdTitle /></i>
                <input onChange={(e)=>setTitle(e.target.value)} value={title} ref={titleRef} type="text" placeholder='title' id='title' name='title' required />
            </div>
          </div>
          <div className='flex justify-between mt-4 gap-2 w-full'>
          <button  onClick={createDoc} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded cursor-pointer">create</button>
          <button onClick={()=>setCreateModelShow(false)} className="bg-[#D1D5DB] hover:bg-[#acafb5] text-black font-bold py-2 px-8 rounded cursor-pointer">cancel</button>

          </div>
        </div>
      </div>
        </>:""
       }
       
      </>
  )
}

export default Home