import React, { useState } from 'react'
import docsIcon from "../images/docsIcon.png"
import { AiFillDelete } from "react-icons/ai";
import deleteIcon from "../images/delete.png"
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { backend_uri } from '../config';
const Docs = ({docs,onDelete}) => {
    const [isDeleteModelShow,setDeleteModelShow] = useState(false)
    const [error,setError] = useState("")
    const navigate = useNavigate()

 const deleteDoc = async(id)=>{    
    const token = localStorage.getItem("token")
    fetch(`${backend_uri}/docs/deleteDoc`,{
          mode:"cors",
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          },
          body:JSON.stringify({
            docId:id,
          }
          )}).then(res=>res.json()).then(
            data=>{
              if(data.success===false){
                setError(data.message)
              }
              else{
                onDelete(id)
                toast.error("document deleted",{duration:2400  })
                setDeleteModelShow(false);
                //window.location.reload()
              }
            }
          )
        }
 
  return (
    <>
    <div className="docs cursor-pointer flex items-center justify-between mt-3 p-[15px] bg-[#F0F0F0] transition-all hover:bg-[#DCDCDC] rounded-lg">
     <div onClick={()=>{navigate(`create/${docs._id}`)}} className="left flex items-center gap-2">
        <img src={docsIcon} alt="doc" />
        <div>
            <h3 className='font-Inter text-[20px]'>{docs.title}</h3>
             <p className='font-Inter text-[13px] text-[#808080]'>Created In : {new Date(docs.date).toDateString()} | Last Updated : {new Date(docs.lastUpdate).toDateString()}</p>
        </div>
     </div>
     <div onClick={()=>{setDeleteModelShow(true)}}className="docsRight cursor-grab pr-5 text-[20px] text-red-500 transition-all hover:text-red-700">
            <i><AiFillDelete /></i>
     </div>
    </div>
    {
        isDeleteModelShow?<><div className="deleteDocsModelCont fixed inset-0 bg-black/30 w-screen h-screen flex flex-col items-center justify-center">
        <div className="deleteDocsModel  p-[15px] bg-[#fff] rounded-lg w-[31vw] h-[26.5vh]">
          <div className="flex items-center mt-6 gap-2">
            <img src={deleteIcon} alt="delteIcon" />
            <div>
              <h3 className='text-[20px]'>are you sure you want to delete?</h3>
{/*               <p className='text-[14px] text-[#808080]'>delete/cancel</p>
 */}              <div className='flex mt-4 gap-2 '>
          <button onClick={()=>{deleteDoc(docs._id)}} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded cursor-pointer">delete</button>
          <button onClick={()=>setDeleteModelShow(false)} className="bg-[#c3c5c7] hover:bg-[#acafb5] text-black font-bold py-2 px-8 rounded cursor-pointer">cancel</button>

          </div>
            </div>
          </div>
        </div>
       </div></>:""
       }
    </>
  )
}

export default Docs