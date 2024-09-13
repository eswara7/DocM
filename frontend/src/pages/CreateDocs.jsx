import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import React, {useState, useRef, useEffect} from 'react';
import JoditEditor from "jodit-pro-react";
import { backend_uri } from '../config';




const CreateDocs = () => {
    const {docId}  = useParams();
    const editor = useRef(null);
    const [content,setContent] =  useState("")
    const [error,setError] = useState("")
    const [data,setData] = useState("")
    


    const summarizeDocument = async () => {
      try {
        const response = await fetch(`${backend_uri}/summarize`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content })
        });
    
        const data = await response.json();
        if (data.success) {
          setContent(data.summary);
          setError('');
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to summarize document.');
      }
    };
    
    const generateContent = async (input) => {
      try {
        const response = await fetch(`${backend_uri}/ai/generate`, {
          mode:"cors",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: input })
        });
    
        const data = await response.json();
        if (data.success) {
          const generatedContent = data.generatedText.replace(input," ").trim()
          setContent(content + '\n' + generatedContent);
          setError('');
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to generate content.');
      }
    };
    

    
    const updateDoc = async()=>{
      try {
        const response = await fetch(`${backend_uri}/docs/updateDoc`,{
          mode:"cors",
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          },
          body:JSON.stringify({
            docId:docId,
            content:content
          })
        })
        const data = await response.json();
        if(data.success===false){
          setError(data.message)
        }else{
          setError("")
        }
      } catch (error) {
        setError("Failed to update document")
      }
    }
    const getDoc = async()=>{
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${backend_uri}/docs/getDoc?docId=${docId}`,{
          mode:"cors",
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          },
        })
        const data = await response.json();
        if(data.success === false){
            setError(data.message)
        }else{
          setContent(data.doc.content)
        }
      } catch (error) {
        setError('failed to fetch document Please try again.');
      }
    }
    useEffect(()=>{
      getDoc()
    },[docId])
    useEffect(()=>{
      if(editor.current){
          editor.current.focus();
      }
    },[1])
  return (
    <div>
      <Navbar/>
      <div className='flex justify-end mr-14 mt-4'>
        <button  onClick={() => {
            const userPrompt = prompt("Enter a topic or command:");
            if (userPrompt) generateContent(userPrompt);
          }} className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-2 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          generate
          </span>
        </button>
      </div>
      <div className='px-14 mt-4 mb-0'>  
         <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1} 
            onChange={e=>{setContent(e);updateDoc()}}
		      />

      </div>
      {<p className='text-red-400'>{error}</p>}


{/*       <button onClick={summarizeDocument}>Summarize</button> */}
 
    </div>
  )
}


export default CreateDocs