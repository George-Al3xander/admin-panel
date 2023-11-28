import Skeleton from "react-loading-skeleton"
import Button from "../../reusable/Button"
import Title from "../../reusable/Title"




const SkeletonImages = () => {


    return(<div>
        <Title>Photos</Title>       
        <div className="flex gap-4 md:flex-row flex-col  justify-between p-4">
            <div className="max-w-[20rem] flex flex-col mx-auto justify-between border-b-2 md:border-b-0">
                <div className="mb-2 text-center">
                <Title variant="nobg">Header</Title>

                </div>
                <div>
                    <Skeleton width={200} height={300}/>
                </div>        
                <div className="flex justify-center my-2">
                    <Button disabled className="mx-auto">Edit</Button>                
                </div>  
            </div>
            <div className="max-w-[20rem] flex flex-col mx-auto justify-between border-b-2 md:border-b-0">
                <div className="mb-2 text-center">
                <Title variant="nobg">Footer</Title>

                </div>
                <div>
                    <Skeleton width={200} height={300}/>
                </div>        
                <div className="flex justify-center my-2">
                    <Button disabled className="mx-auto">Edit</Button>                
                </div>  
            </div>

        </div>
    </div>)
}
export default SkeletonImages