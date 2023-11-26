import useFormData from "../../hooks/useFormData"
import { project } from "../../types/types"
import AcceptRejectBtns from "../reusable/AcceptRejectBtns";
import useUpdateImage from "../../hooks/useUpdateImage";
import ProjectForm from "./ProjectForm";




const EditProject = ({project, handleStatus, mutate}: {project: project, handleStatus: Function, mutate: Function}) => {
   
   const {handleChange, statusChanges, formData, removeFromForm} = useFormData(project)
   const {onImageChange, update, resetUpload, isImage} = useUpdateImage({image: project.img, onSucces: () => {}, folder: "images"})
     
   const updateProject = async () => {
      await mutate(formData)
      await update()
   }
    
    return(<div>
       <ProjectForm project={project} handleChange={handleChange} onImageChange={onImageChange} resetImgCallback={() => {
         removeFromForm("img")
         resetUpload()
       }}/>
       <AcceptRejectBtns condtion={[statusChanges,isImage].every((el) => el == false)} accept={updateProject} reject={handleStatus}/>
    </div>)
}


export default EditProject