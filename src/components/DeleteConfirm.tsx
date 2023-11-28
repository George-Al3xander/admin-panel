import { MouseEventHandler, useEffect, useRef } from "react"
import Button from "./reusable/Button"
import { project, skill } from "../types/types"




const DeleteConfirm = ({obj,status, deleteFunc, cancelFunc,scroll}: {obj: project | skill,status: boolean, deleteFunc: MouseEventHandler<HTMLButtonElement> , cancelFunc: MouseEventHandler<HTMLButtonElement> ,scroll? : boolean}) => {

    const msgRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(status == true && msgRef.current && scroll) {
            msgRef.current.scrollIntoView({behavior: "smooth"})
        }
    }, [status]);
    
    if(!status) return null

    return(<div ref={msgRef} className="absolute top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,.7)] flex justify-center items-center">
    <div className={`bg-white ${scroll ?  "md:w-[70%] p-4 rounded-lg" : "h-[100%] p-2 text-center"} flex flex-col justify-between`}>
        <h2 className="font-medium text-lg mb-10">Are you sure you want to delete <span className="underline font-bold">"{obj.name}"</span>  <span className="font-bold text-red-600">permanently</span>?</h2>
        <div>
            <div className="flex justify-center my-2 flex-wrap">
                <Button variant="reject"  className="mx-auto"  onClick={deleteFunc}>Delete</Button>                
                <Button onClick={cancelFunc}>Cancel</Button>
            </div>
        </div>
    </div>
</div>)
}

export default DeleteConfirm