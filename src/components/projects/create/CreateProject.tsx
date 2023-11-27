import { createPortal } from "react-dom";
import { MouseEventHandler} from "react";
import CreateProjectForm from "./CreateProjectForm";



const CreateProject = ({status, close, refetch} : {status: boolean, close: MouseEventHandler<HTMLDivElement>, refetch: Function}) => {
   
   if(!status) return null
    
    return createPortal(<> 
        <div onClick={close} className="fixed left-0 right-0 top-0 bottom-0  bg-[rgba(0,0,0,.7)] z-[1000]"></div>         
        <CreateProjectForm refetch={refetch}  close={close}/>
    </>,document.getElementById("portal")!)
}


export default CreateProject