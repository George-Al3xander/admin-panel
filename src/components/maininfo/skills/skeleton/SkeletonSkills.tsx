import { FaRankingStar } from "react-icons/fa6"
import Button from "../../../reusable/Button"
import Title from "../../../reusable/Title"
import Skeleton from "react-loading-skeleton"




const SkeletonSkills = () => {
    const arr = [0,1,2,3,4,5,6,7,8,9]


    return(<div>
        <div className="mb-10 flex flex-col">
                <Title className="uppercase">skills</Title>
                <Button disabled  className="text-lg ml-[auto]"><FaRankingStar size={20}/> New skill</Button>
            </div>
        <ul className="grid md:grid-cols-3 gap-5 mb-10">
            {arr.map((el) => {
                return <li key={"skeleton-skill-" + el} className="border-2 p-2 rounded relative">
                    <div className="max-w-[4rem] mx-auto my-4">
                        <Skeleton height={60}/>
                    </div>
                    <div  className="border-b-2  py-2  w-[100%]">
                         <Skeleton count={1} height={20} />  
                    </div>
                    <div className="border-b-2  py-2  w-[100%]">
                        <Skeleton count={1} height={20} />  
                    </div>
                    <div className="flex justify-center my-2">
                        <Button disabled  className="mx-auto" >Edit</Button>                
                        <Button disabled variant="reject"  className="mx-auto">Delete</Button>                
                    </div>
                </li>
            })}
        </ul>
    </div>)
}

export default SkeletonSkills