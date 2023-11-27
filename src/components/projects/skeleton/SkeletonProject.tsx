import Skeleton from "react-loading-skeleton"
import Button from "../../reusable/Button"




const SkeletonProject = () => {

    const arr = [1,2,3,4,5,6]
    return(<div key={"Skeleton"} className="border-2 p-2 rounded relative w-[100%]">
        <div className="max-w-[20rem] mx-auto">
            <Skeleton height={200}/>
        </div>
        {arr.map((el) => {
            return <div key={"skeleton- " + el} className="border-b-2  py-2  w-[100%]">
                <Skeleton count={1} height={20} />  
            </div>
        })}
        <div className="flex justify-center my-2">
            <Button disabled  className="mx-auto" >Edit</Button>                
            <Button disabled variant="reject"  className="mx-auto">Delete</Button>                
        </div>

    </div>)
}


export default SkeletonProject