import {useRef } from "react";
import parse from 'html-react-parser';
import { Editor } from '@tinymce/tinymce-react';
import { description } from "../../types/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

import useUpdate from "../../hooks/useUpdate.ts";
import AcceptRejectBtns from "../reusable/AcceptRejectBtns";
import Button from "../reusable/Button";
import Title from "../reusable/Title";



const Description = ({desc}: {desc: description}) => {
    const {description,id} = desc    
    const editorRef = useRef<any>(null);
    const descRef = doc(db, "links", id)
    const update = async() => {
        if(editorRef != null) {
            await updateDoc(descRef, {description:editorRef.current.getContent()})
        }
    }

    const {mutate, isLoading,editStatus,handleStatus} = useUpdate(update)
    
    
    if(isLoading) {
        <div className="flex  gap-4">
            <h3 className="text-xl text-green-500">Updating...</h3>
            <button disabled>Click</button>
            <button disabled>Cancel</button>
        </div>
    }
    
    if(editStatus == false && isLoading == false) {
        return <div>
        <Title>Description</Title>        
        <div className="p-2">
        {parse(description)} 

        </div>
        <div className="flex justify-center my-2">
            <Button className="mx-auto" onClick={handleStatus}>Edit</Button>                
        </div>
        </div>
    }

   
    return(<div>
        <h1 className="bg-primary text-white">Description</h1>
        <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue={description}   
               
         apiKey={import.meta.env.VITE_MCE_API_KEY}
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />     
       <AcceptRejectBtns accept={() => mutate()} reject={handleStatus}/>  
    </div>)
}

export default Description