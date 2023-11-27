import { useEffect, useState } from "react"
import { useMutation } from "react-query"


export type useUpdateResult = ReturnType<typeof useUpdate>;

const useUpdate = (mutationFn: any) => {
    const [editStatus, setEditStatus] = useState(false)        
    const handleStatus = () => setEditStatus((prev) => !prev)

    const {data,mutate, isLoading,isSuccess, isError} = useMutation({mutationFn, mutationKey: ["update"], onSuccess: (data) => {data}})
    useEffect(() => {
        if(isSuccess) {
            setEditStatus(false)
        }
    },[isSuccess])

    return {data, mutate, isLoading,isError,editStatus,handleStatus}
}

export default useUpdate