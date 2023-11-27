import useFormData from "../../hooks/useFormData"
import { project } from "../../types/types"
import AcceptRejectBtns from "../reusable/AcceptRejectBtns";
import useUpdateImage from "../../hooks/useUpdateImage";
import ProjectForm from "./ProjectForm";
import useValidateProjects from "../../hooks/useValidateProjects";
import { toast } from "react-toastify";





const EditProject = ({project, handleStatus, mutate, refetch, isError}: {project: project, handleStatus: Function, mutate: Function, refetch: Function, isError: boolean}) => {
   
   const {handleChange, statusChanges, formData, removeFromForm} = useFormData(project)
   const {onImageChange, update, resetUpload, isImage} = useUpdateImage({image: project.img, onSucces: () => {}, folder: "images"})
   const {overall} = useValidateProjects(formData)
   const notifyErr = (msg:string) => toast.error(msg);
   const notifySucces = (msg:string) => toast.success(msg);
     
   const updateProject = async () => {  
      try {
         if(statusChanges) {
            await mutate(formData)            
            if(isError) throw new Error()
         }
         if(isImage) {        
            const res = await update()                
            if(res!.status != 200) throw new Error() 
         }   
         refetch()
         handleStatus()
         notifySucces("Project updated")
      } catch (error) {
         notifyErr("Updating project failed")         
      }   

   }

   const resetImgCallback = () => {
      removeFromForm("img")
      resetUpload()
   }

    const coondtion = overall ? statusChanges || isImage ?  false : true : true
   
    return(<div>
       <ProjectForm project={project} handleChange={handleChange} onImageChange={onImageChange} resetImgCallback={resetImgCallback}/>
       <AcceptRejectBtns condtion={coondtion} accept={updateProject} reject={handleStatus}/>
    </div>)
}


export default EditProject