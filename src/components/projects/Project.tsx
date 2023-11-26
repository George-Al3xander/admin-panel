import useUpdate from "../../hooks/useUpdate";
import {formData, project } from "../../types/types"
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import Button from "../reusable/Button";


import EditProject from "./EditProject";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";


const InfoField = ({title, data} : {title: string, data: string}) => {
    
    return <div className="border-b-2 flex gap-4 py-2 flex-wrap">
        <h3 className="font-bold capitalize">{title}: </h3>
        <span>{data}</span>
    </div>

}


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

    return(<div key={`preview-${id}`} className="border-2 p-2 rounded">
        {/* {isHidden ? <BiSolidHide /> : <BiSolidShow/>} */}
        <div className="max-w-[20rem] mx-auto">
            <img src={url} alt={`preview-img-${id}`} />
        </div>
        <InfoField title={"title"} data={name}/>
        <InfoField title={"github"} data={url_github}/>
        <InfoField title={"preview"} data={url_preview}/>
        <InfoField title={"isFullstack"} data={isFullstack ? "true" : "false"}/>
        <InfoField title={"isHidden"} data={isHidden ? "true" : "false"}/>
        

        <div className="border-b-2 flex gap-4 py-2 flex-wrap">
            <h3 className="font-bold capitalize">Description: </h3>
            <p>{description}</p>
        </div>
        <div className="flex justify-center my-2">
            <Button  className="mx-auto" onClick={handleStatus}>Edit</Button>                
        </div>
    </div>)
}

export default Project