import { addDoc, collection } from "firebase/firestore"
import useFormData from "../../../hooks/useFormData"
import useUpdateImage from "../../../hooks/useUpdateImage.ts"
import AcceptRejectBtns from "../../reusable/AcceptRejectBtns"
import ProjectForm from "../ProjectForm"
import { db } from "../../../firebase-config"
import useValidateProjects from "../../../hooks/useValidateProjects.ts"
import { toast } from "react-toastify"





const CreateProjectForm = ({close, refetch}: {close:  Function, refetch:Function}) => {
    const {handleChange,formData, removeFromForm, statusChanges} = useFormData()
    const {onImageChange, update, resetUpload, isImage} = useUpdateImage({onSucces: () => {}, folder: "images"})
    const {overall} = useValidateProjects(formData)
    const notifyErr = (msg:string) => toast.error(msg);
    const notifySucces = (msg:string) => toast.success(msg);
   
    const updateProject = async () => {             
        const docRef = await addDoc(collection(db, "projects"), formData);      
        update(docRef.id)
        .then(() => {            
            notifySucces("Project created")
            refetch()
            close()
        }).catch(() => {
            notifyErr("Creation of a new project failed")
        })
     }

    const resetImgCallback = () => {
        removeFromForm("img");
        resetUpload();
    }

    return(<div className="translate-y-[-50%] translate-x-[-50%] fixed z-[1000] top-[50%] left-[50%] bg-white rounded-lg">
        <ProjectForm  handleChange={handleChange} onImageChange={onImageChange} resetImgCallback={resetImgCallback}/>
        <AcceptRejectBtns condtion={[statusChanges,isImage, overall].includes(false)} accept={updateProject} reject={close}/>
   </div> )
}

export default CreateProjectForm