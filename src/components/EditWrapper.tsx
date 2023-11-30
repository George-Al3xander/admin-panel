import useUpdate from "../hooks/useUpdate.ts"
import { PreviewCoompProps } from "../types/types"




const EditWrapper = ({initialData, mutationFn,LoadingCoomp,PreviewCoomp,EditCoomp}: {initialData: unknown,mutationFn:any,LoadingCoomp:React.ComponentType,PreviewCoomp:React.ComponentType<PreviewCoompProps>,EditCoomp:React.ComponentType}) => {
    
    const  {data, mutate, isLoading,editStatus,handleStatus} = useUpdate(mutationFn)

    

    if(isLoading) {
        return <LoadingCoomp/>
    }
    
    if(editStatus == false && isLoading == false) {
        return <div>
            <PreviewCoomp initialData={data ? data : initialData}/>
            <div className="mt-4">
                <button onClick={handleStatus}>Edit</button>           
            </div>
        </div>

    }

   //edit
    return (<div>
        <EditCoomp/>
        <div className="flex  gap-4">
            <button onClick={() => mutate()}>Update</button>
            <button onClick={handleStatus}>Cancel</button>
        </div>
    </div>)


}


export default EditWrapper

