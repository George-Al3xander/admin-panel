import useUpdate from "../../hooks/useUpdate";
import {formData, project } from "../../types/types"
import Button from "../reusable/Button";
import EditProject from "./EditProject";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { useState } from "react";

import DeleteConfirm from "../DeleteConfirm";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
//import { ProjectsContext, handleProjectLocally, useHandleProjectLocally } from "../../hooks/useProjects";
//import { useContext } from "react";


const InfoField = ({title, data} : {title: string, data: string}) => {
    
    return <div className="border-b-2 flex gap-4 py-2 flex-wrap">
        <h3 className="font-bold capitalize">{title}: </h3>
        <span>{data}</span>
    </div>

}


const Project = ({project, refetch}: {project:project, refetch: Function}) => {
    const [deleteMenu,setDeleteMenu] = useState(false)
    const {name, id,img,description,url_github,url_preview,isFullstack, isHidden} = project
    const projectsRef = doc(db, "projects", id)
    const {url, fullName} = img
    const update = async (formData: formData) => {
        await updateDoc(projectsRef, formData)        
    }
    const notifyErr = (msg:string) => toast.error(msg);
    const notifySucces = (msg:string) => toast.success(msg);

    const deleteProject = () => {
        deleteDoc(projectsRef).then(() => {
            deleteObject(ref(storage, `images/${project.img.fullName}`)).then(() => {
                notifySucces("Project deleted")
                refetch()
            }).catch(() => {
                notifyErr("Deleting photo from storage failed")
            })
        }).catch(() => {
            notifyErr("Deleting project failed")
        })
    }   

    
    const {mutate, isLoading,editStatus,handleStatus,isError} = useUpdate(update)
    
    if(isLoading) {
        return <div>Loading...</div>
    }
   
    if(editStatus) {
        return <div>
            <EditProject refetch={refetch} isError={isError} mutate={mutate} handleStatus={handleStatus} project={project}/>
        </div>
    }

    return(<div key={`preview-${id}`} className="border-2 p-2 rounded relative">
        <DeleteConfirm obj={project} status={deleteMenu} deleteFunc={deleteProject} cancelFunc={() => setDeleteMenu(false)}/>


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
            <Button variant="reject"  className="mx-auto"  onClick={() => setDeleteMenu(true)}>Delete</Button>                
        </div>
    </div>)
}

export default Project