import {useState } from "react"
import useUpdate from "../../hooks/useUpdate.ts"
import { links } from "../../types/types"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Button from "../reusable/Button";
import AcceptRejectBtns from "../reusable/AcceptRejectBtns";




const EditLinksWrapper = ({links, type}: {links: links,type: "email" | "github" | "linkedin"}) => {
    
    const initialData = links[type]
    const [text,setText]= useState<string>(initialData);
    const linksRef = doc(db, "links", links.id)
    const update = async() => {
        await updateDoc(linksRef, {[type]:text})  
        return text  
    }
    const  {data, mutate, isLoading,editStatus,handleStatus} = useUpdate(update)

    
    
    if(editStatus == false && isLoading == false) {
        return <div className="p-2">
            <div><h2>{data ? data as string :  initialData}</h2></div>
            <div className="flex gap-4 mx-auto justify-center my-2">               
                <Button onClick={handleStatus}>Edit</Button>
            </div>
        </div>

    }

    return (<div className="p-2">
        <input className="w-[100%] border-b-2 focus:outline-none focus:border-b-2 focus:border-primary" type="text" defaultValue={data ? data as string :  initialData} onChange={(e) => setText(e.target.value)}/>         
        <AcceptRejectBtns accept={() => mutate()} reject={handleStatus} condtion={data ? data == text :  text == initialData}/>
    </div>)


}


export default EditLinksWrapper

