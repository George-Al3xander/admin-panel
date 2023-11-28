import { ReactNode } from "react"

import { createPortal } from "react-dom";



const Modal = ({status,children} : {status: boolean, children: ReactNode}) => {
    if(!status) return null


    return createPortal(<> 
       {children}
    </>,document.getElementById("portal")!)
}

export default Modal