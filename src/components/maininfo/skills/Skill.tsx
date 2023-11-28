import { formData, project, skill } from "../../../types/types"
import parse from 'html-react-parser';
import Button from "../../reusable/Button";
import InfoField from "../../InfoField";
import useUpdate from "../../../hooks/useUpdate";
import EditSkill from "./EditSkill";
import { useState } from "react";
import DeleteConfirm from "../../DeleteConfirm";




const Skill = ({skill}: {skill: skill}) => {
    const {name, icon, order} = skill
    const update = (formData: formData) => {
        console.log(formData)
    }
    const deleteSkill = () => {
        console.log(11)
    }
    const {editStatus, handleStatus, mutate} = useUpdate(update)
    const [deleteMenu,setDeleteMenu] = useState(false)
   
    
    if(editStatus) {
        return <EditSkill mutate={mutate} handleStatus={handleStatus}  skill={skill}/>
    }

    return(<div className="border-2 p-2 rounded relative"> 
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
    </div>)
}


export default Skill