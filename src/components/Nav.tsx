import { NavLink } from "react-router-dom"
import { GrContactInfo } from "react-icons/gr";
import { TfiRulerPencil } from "react-icons/tfi";
import { BsListStars } from "react-icons/bs";
const Nav = () => {


    const fields = [
        {path: "main-info", icon: GrContactInfo},
        {path: "projects", icon: TfiRulerPencil},
        {path: "skills", icon: BsListStars}
    ]

    return(<nav className="bg-primary  text-white w-[100%] md:w-[10rem] p-4 z-40 fixed md:h-[100%] text-center justify-between flex gap-4 flex-wrap md:flex-col md:justify-start mb-10">
        <h3 className="text-lg italic uppercase">Admin panel</h3>
        <ul className="flex flex-row md:flex-col gap-4">
            {fields.map((field) => {
                return <li >
                    <NavLink className="opacity-60 hover:opacity-100 capitalize flex items-center gap-2" to={`/${field.path}`}>
                        <field.icon  size={20}/>
                        <span>{field.path.replace("-", " ")}</span>
                    </NavLink>
                </li>
            })}           
        </ul>
    </nav>)
}

export default Nav