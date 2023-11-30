import { useEffect, useState } from "react"
import { deleteObject, ref, uploadBytes } from "firebase/storage"
import { picture } from "../types/types"
import { storage } from "../firebase-config"




const useUpdateImage = ({image, onSucces, folder}: {image?: picture, onSucces: Function, folder: string}) => {    
    const [isLoading,setIsLoading] = useState(false);
    const [editStatus, setEditStatus] = useState(false)        
    const handleStatus = () => setEditStatus((prev) => !prev)
    const [isImage, setIsImage] = useState(false)
    const [imageUpload, setImageUpload] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const onImageChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImageUpload(event.target.files[0])
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
       }
    const update = async (id? : string) => {
        if (imageUpload == null) return;
        setIsLoading(true)
        const imageRef = ref(storage, `${folder}/${image ? image.fullName : id}`);
        if(image) {
            await deleteObject(imageRef)
        }      
        uploadBytes(imageRef, imageUpload).then(() => {
            onSucces()
            setIsLoading(false)
        }) 
        .catch((error) => {
            setIsLoading(false)
            console.log(error)
            return {status: 400}
            
        });    
        return {status: 200}

    }

    

    const resetUpload = () => {      
        setImageUpload(null)
    }

    

    useEffect(() => {
        if(imageUpload) {
            setIsImage(true)
        } else {
            setIsImage(false)
        }    
    }, [imageUpload])

   
    
    useEffect(() => {        
        if(!editStatus) {
            setImagePreview("")
        }
    },[editStatus])



    return {isLoading,update, imagePreview, imageUpload, onImageChange, editStatus,handleStatus, resetUpload, isImage}


}

export default  useUpdateImage