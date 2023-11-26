import useFormData from "../../hooks/useFormData"
import { project } from "../../types/types"
import AcceptRejectBtns from "../reusable/AcceptRejectBtns";
import useUpdateImage from "../../hooks/useUpdateImage";
import ProjectForm from "./ProjectForm";
import useValidateProjects from "../../hooks/useValidateProjects";
import { useEffect } from "react";




const EditProject = ({project, handleStatus, mutate}: {project: project, handleStatus: Function, mutate: Function}) => {
   
   const {handleChange, statusChanges, formData, removeFromForm} = useFormData(project)
   const {onImageChange, update, resetUpload, isImage} = useUpdateImage({image: project.img, onSucces: () => {}, folder: "images"})
   const {overall} = useValidateProjects(formData)
     
   const updateProject = async () => {
      await mutate(formData)
      await update()
   }
   const resetImgCallback = () => {
      removeFromForm("img")
      resetUpload()
  }
    
    return(<div>
       <ProjectForm project={project} handleChange={handleChange} onImageChange={onImageChange} resetImgCallback={resetImgCallback}/>
       <AcceptRejectBtns condtion={[statusChanges,overall].includes(false)} accept={updateProject} reject={handleStatus}/>
    </div>)
}


export default EditProject