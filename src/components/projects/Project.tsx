import useUpdate from "../../hooks/useUpdate";
import {formData, project } from "../../types/types"
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import Button from "../reusable/Button";


import EditProject from "./EditProject";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";



const Project = ({project}: {project:project}) => {
    const {name, id,img,description,url_github,url_preview,isFullstack, isHidden} = project
    const projectsRef = doc(db, "projects", id)
    const {url, fullName} = img
    const update = async (formData: formData) => {
        await updateDoc(projectsRef, formData)        
    }

    
    const {mutate, isLoading,editStatus,handleStatus} = useUpdate(update)
    
    if(isLoading) {
        return <div>Loading...</div>
    }
   
    if(editStatus) {
        return <div>
            <EditProject mutate={mutate} handleStatus={handleStatus} project={project}/>
        </div>
    }

    return(<div key={`preview-${id}`}>
        {/* {isHidden ? <BiSolidHide /> : <BiSolidShow/>} */}
        <div className="max-w-[20rem]">
            <img src={url} alt={`preview-img-${id}`} />
        </div>
        <div>
        <h3>Title: <span> {name}</span></h3>
        </div>
        <div>
        <h3>github: <span> {url_github}</span></h3>
        </div>
        <div>
        <h3>preview: <span> {url_preview}</span></h3>
        </div>
        <div>
        <h3>IsFullstack: <span> {isFullstack ? "true" : "false"}</span></h3>
        </div>
        <div>
        <h3>isHidden: <span> {isHidden ? "true" : "false"}</span></h3>
        </div>
        <div>
            <h3>Description: </h3>
            <p>{description}</p>
        </div>
        <div className="flex justify-center my-2">
            <Button  className="mx-auto" onClick={handleStatus}>Edit</Button>                
        </div>
    </div>)
}

export default Project