import { addDoc, collection } from "firebase/firestore"
import useFormData from "../../../hooks/useFormData"
import useUpdateImage from "../../../hooks/useUpdateImage.ts"
import AcceptRejectBtns from "../../reusable/AcceptRejectBtns"
import ProjectForm from "../ProjectForm"
import { db } from "../../../firebase-config"
import { MouseEventHandler, useContext, useEffect} from "react"
//import useValidateProjects from "../../../hooks/useValidateProject.ts"
import useValidateProjects from "../../../hooks/useValidateProjects.ts"
import { ProjectsContext } from "../../../hooks/useProjects.tsx"




const CreateProjectForm = ({close}: {close: MouseEventHandler<HTMLDivElement> | Function}) => {
    const {handleChange,formData, removeFromForm, statusChanges} = useFormData()
    const {onImageChange, update, resetUpload, isImage} = useUpdateImage({onSucces: () => {}, folder: "images"})
    const {overall} = useValidateProjects(formData)
     useEffect(() => {
        console.log(overall)
    }, [overall])
    const {handleProjectLocally} = useContext(ProjectsContext)

    const updateProject = async () => {      
        const docRef = await addDoc(collection(db, "projects"), formData);      
        await update(docRef.id)
        console.log(await docRef.id)
     }

    const resetImgCallback = () => {
        removeFromForm("img");
        resetUpload();
    }

    return(<div className="translate-y-[-55%] translate-x-[-50%] fixed z-[1000] top-[50%] left-[50%] bg-white">
        <ProjectForm  handleChange={handleChange} onImageChange={onImageChange} resetImgCallback={resetImgCallback}/>
        <AcceptRejectBtns condtion={[statusChanges,isImage, overall].includes(false)} accept={updateProject} reject={close}/>
   </div> )
}

export default CreateProjectForm