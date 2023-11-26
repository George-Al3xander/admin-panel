import { links } from "../../types/types"
import EditLinksWrapper from "./EditLinksWrapper"
import Title from "../reusable/Title"




const Links = ({links}: {links: links}) => {


    return(<ul className="flex  w-[100%] justify-between flex-col md:flex-row flex-wrap">
        {Object.keys(links).map((key) => {
            if(key !== "id") {
                return <li className="basis-[100%]">            
                    <Title>{key}</Title>
                    <EditLinksWrapper links={links} type={key as "email"} />
            </li>
            }
        })}        
        
    </ul>)
}

export default Links