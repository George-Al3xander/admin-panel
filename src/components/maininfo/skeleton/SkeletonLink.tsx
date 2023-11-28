import Skeleton from "react-loading-skeleton"
import Button from "../../reusable/Button"
import Title from "../../reusable/Title"




const SkeletonLink = ({name}: {name: string}) => {


    return(<div>
        <Title>{name}</Title>        
        <div className="p-2">
            <Skeleton count={name == "description" ? 5 : 1} height={20}/>
        </div>
        <div className="flex justify-center my-2">
            <Button disabled className="mx-auto" >Edit</Button>                
        </div>
    </div>)
}

export default SkeletonLink