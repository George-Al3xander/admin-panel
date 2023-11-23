import useFormData from "../../hooks/useFormData"
import { project } from "../../types/types"
import AcceptRejectBtns from "../reusable/AcceptRejectBtns";
import useUpdateImage from "../../hooks/useUpdateImage";
import ProjectForm from "./ProjectForm";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";




const CreateProject = () => {
   
   const {handleChange, statusChanges, formData, removeFromForm} = useFormData({})
   const {onImageChange, update, resetUpload, isImage} = useUpdateImage({onSucces: () => {}, folder: "images"})
     
   const updateProject = async () => {      

      const docRef = await addDoc(collection(db, "projects"), formData);      
      await update(docRef.id)
   }
    
    return(<div>
       <ProjectForm  handleChange={handleChange} onImageChange={onImageChange} resetImgCallback={() => {
         removeFromForm("img")
         resetUpload()
       }}/>
       <AcceptRejectBtns condtion={[isImage].every((el) => el == false)} accept={updateProject} reject={() => console.log("no")}/>
    </div>)
}


export default CreateProject