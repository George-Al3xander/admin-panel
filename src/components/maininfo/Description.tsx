import {useState } from "react";
import { description } from "../../types/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import useUpdate from "../../hooks/useUpdate.ts";
import AcceptRejectBtns from "../reusable/AcceptRejectBtns";
import Button from "../reusable/Button";
import Title from "../reusable/Title";
import Skeleton from "react-loading-skeleton";



const Description = ({desc}: {desc: description}) => {
    const {description,id} = desc       
    const descRef = doc(db, "links", id);
    const [newDesc, setNewDesc] = useState(description);
    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = e.target 
        setNewDesc(value)
    }
    const update = async() => {  
        await updateDoc(descRef, {description:newDesc.trim()});
        return newDesc   
    }

    const {data,mutate, isLoading,editStatus,handleStatus} = useUpdate(update)
    
    
    if(isLoading) {
        return <div>
            <Title>Description</Title>        
            <div  className="my-4" >
                <Skeleton height={20} count={8}/>
            </div>
            <AcceptRejectBtns reject={() => {}} accept={() => {}} condtion={true} />

        </div>
    }
    
    if(editStatus == false && isLoading == false) {
        return <div>
        <Title>Description</Title>        
        <div className="p-2">
        <p>{data ? data as string :  description}</p>
        </div>
        <div className="flex justify-center my-2">
            <Button className="mx-auto" onClick={handleStatus}>Edit</Button>                
        </div>
        </div>
    }

   
    return(<div>
        <h1 className="bg-primary text-white">Description</h1>        
       <textarea className="p-2 w-[100%]" onChange={handleDescChange} defaultValue={data ? data as string :  description} name="description" id=""  rows={10}></textarea>
       <AcceptRejectBtns condtion={data ? data == newDesc :  newDesc == description} accept={() => mutate()} reject={handleStatus}/>  
    </div>)
}

export default Description