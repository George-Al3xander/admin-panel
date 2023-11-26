import useUpdateImage from "../../../hooks/useUpdateImage.ts"
import { picture } from "../../../types/types"
import AcceptRejectBtns from "../../reusable/AcceptRejectBtns"
import Button from "../../reusable/Button"
import { BiImageAdd } from "react-icons/bi";
import Title from "../../reusable/Title";



const EditImage = ({image, refetch}:  {image: picture, refetch: Function}) => {    
    const {name, url} = image
    const {isLoading,update, imagePreview,  onImageChange, editStatus,handleStatus} = useUpdateImage({image, onSucces: refetch, folder: "myself"})

    if(isLoading) {
        return <div>Loading...</div>
    }
    

    if(!editStatus) {
        return <div className="max-w-[20rem] flex flex-col mx-auto justify-between border-b-2 md:border-b-0">
            <div className="mb-2 text-center">
            <Title variant="nobg">{name.replace("pic_", " ")}</Title>

            </div>
            <div>
                <img className="object-cover w-[100%] h-[100%] border-10" src={url} alt={name} />
            </div>        
            <div className="flex justify-center my-2">
                <Button className="mx-auto" onClick={handleStatus}>Edit</Button>                
            </div>  
        </div>
    }
  
    

    return(<div className="max-w-[20rem] mx-auto flex flex-col justify-between border-b-2 md:border-b-0">
    <div className="mb-2 text-center">
        <Title variant="nobg">{name.replace("pic_", " ")}</Title>
        <span className="text-sm italic uppercase opacity-60">preview new image</span>
    </div>
    <div>
    <div className="flex flex-col gap-4 my-2">
        {imagePreview.length > 0 ?
        <img className="object-cover w-[100%] h-[100%] border-10"  src={imagePreview}  alt={`preview-${name}`} />   
        :
        <label className="flex justify-center" htmlFor={`input-${name}`}>
            <BiImageAdd className={"opacity-60"} size={100}/>
        </label>
        }            
        <input className="text-center" onChange={onImageChange} accept="image/*" id={`input-${name}`} type="file" />            
    </div>
        
    </div>        
    <div className="flex justify-center my-2">                               
        <AcceptRejectBtns accept={update} condtion={imagePreview.length == 0} reject={handleStatus}/>
    </div>  
</div>)
}


export default EditImage