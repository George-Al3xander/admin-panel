import { formData, project, skill } from "../../../types/types"
import parse from 'html-react-parser';
import Button from "../../reusable/Button";
import InfoField from "../../InfoField";
import useUpdate from "../../../hooks/useUpdate";
import EditSkill from "./EditSkill";
import { useState } from "react";
import DeleteConfirm from "../../DeleteConfirm";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { toast } from "react-toastify";




const Skill = ({skill, refetch}: {skill: skill, refetch: Function}) => {
    const {name, icon, order} = skill;
    const notifyErr = (msg:string) => toast.error(msg);
    const notifySucces = (msg:string) => toast.success(msg);

    const update = async (formData: formData) => {
        const docRef = doc(db, "skills", skill.id);
        const temp = formData
        // @ts-ignore
        temp.order = +formData.order
        try {
            await updateDoc(docRef, temp)  ;
            refetch();
            notifySucces(`"${skill.name}" edited`)            
        } catch (error) {
            notifyErr(`Updating ${skill.name}" failed`) 
        }

    }
    const deleteSkill = async () => {
        await deleteDoc(doc(db, "skills", skill.id));
        notifySucces(`"${skill.name}" deleted`)
        refetch()
    }
    const {editStatus, handleStatus, mutate} = useUpdate(update)
    const [deleteMenu,setDeleteMenu] = useState(false)
   
    
    if(editStatus) {
        return <EditSkill mutate={mutate} handleStatus={handleStatus}  skill={skill}/>
    }

    return(<li className="border-2 p-2 rounded relative"> 
        <DeleteConfirm obj={skill} status={deleteMenu} deleteFunc={deleteSkill} cancelFunc={() => setDeleteMenu(false)}/>
        
        <div className="max-w-[4rem] mx-auto my-4">
            {parse(icon)}
        </div>
        <div>
            <InfoField title={"name"} data={name}/>
            <InfoField title={"order"} data={order}/>
        </div>
        <div className="flex justify-center my-2">
            <Button onClick={handleStatus}  className="mx-auto" >Edit</Button>                
            <Button variant="reject" onClick={() => setDeleteMenu(true)}  className="mx-auto"  >Delete</Button>                
        </div>
    </li>)
}


export default Skill