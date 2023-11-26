import { addDoc, collection } from "firebase/firestore"
import useFormData from "../../../hooks/useFormData"
import useUpdateImage from "../../../hooks/useUpdateImage.ts"
import AcceptRejectBtns from "../../reusable/AcceptRejectBtns"
import ProjectForm from "../ProjectForm"
import { db } from "../../../firebase-config"
import { MouseEventHandler, useEffect} from "react"
import useValidateFD from "../../../hooks/useValidateProject.ts"




const CreateProjectForm = ({close}: {close: MouseEventHandler<HTMLDivElement>}) => {
    const {handleChange,formData, removeFromForm} = useFormData()
    const {onImageChange, update, resetUpload, isImage} = useUpdateImage({onSucces: () => {}, folder: "images"})
    const {overall} = useValidateFD(formData)
    useEffect(() => {
    
    }, [overall])

    const updateProject = async () => {      
        const docRef = await addDoc(collection(db, "projects"), formData);      
        await update(docRef.id)
     }

    const resetImgCallback = () => {
        removeFromForm("img")
        resetUpload()
    }

    return(<div className="translate-y-[-55%] translate-x-[-50%] fixed z-[1000] top-[50%] left-[50%] bg-white">
        <ProjectForm  handleChange={handleChange} onImageChange={onImageChange} resetImgCallback={resetImgCallback}/>
        <AcceptRejectBtns condtion={[isImage, Object.keys(formData).length > 4].every((el) => el == false)} accept={updateProject} reject={close}/>
   </div> )
}

export default CreateProjectForm