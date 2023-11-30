import { ButtonHTMLAttributes, FC, useState } from "react"
import { useCookies } from "react-cookie";
import { IoIosLogOut } from "react-icons/io";
import { cn } from "./reusable/utils";



const LogoutBtn : FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({className}) => {
    const [_cookies, _setCookie, removeCookie] = useCookies(['user']);

    const logout = () => {
        window.location.reload()
        removeCookie("user")
    }

    const btnStyles = "opacity-60 hover:opacity-100 capitalize flex items-center gap-2"
    const [confirm, setConfirm] = useState(false)
    if(confirm) {
        return <div className={cn("flex gap-2 flex-wrap",className)}>
            <button onClick={logout} className={btnStyles}>Sure</button>
            <button className={btnStyles}  onClick={() => setConfirm(false)}>cancel</button>
        </div>
    }


    return(<button  className={cn(btnStyles,className)} onClick={() => setConfirm(true)}><IoIosLogOut size={20}/>Logout</button>)
}

export default LogoutBtn