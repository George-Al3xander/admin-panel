import { useEffect, useState } from "react"
import { formData, project } from "../types/types"
import { RVTool } from "regex-validation-tool"



const useValidateProject = (formData: formData<project>) => {
    const rvt = new RVTool()
    const [valid, setValid] = useState({valid_name: false, valid_description: false, valid_url_github: false, valid_url_preview: false, valid_created_at: false});
    const [overall, setOverall] = useState(false)
    const notBlank = rvt.customRegex(/\S/)    
    useEffect(() => {
        const keys  = Object.keys(formData) as (keyof project)[]
        if(keys.length > 0) {
            keys.forEach((key) => {
                const path = "valid_" + key
                console.log(path)
                if(key.startsWith("url")) {
                    setValid((prev) => {
                        return {...prev, [path]: rvt.isUrl(formData[key as keyof formData] as string)}
                    })                     
                }  
                else if(key == "description" || key == "name" || key == "created_at") {
                    setValid((prev) => {
                        return {...prev, [path]: notBlank(formData[key as keyof formData]!)}
                    })
                }  
            })
        } else {
            setOverall(false)
        }
    },[formData])


    useEffect(() => {
        const keys  = Object.keys(valid) as (keyof typeof valid)[]
        if(keys.length > 4) {
            let arr : boolean[] = []
            keys.forEach((key) => {
                arr.push(valid[key])
            })
            setOverall(arr.every((el) => el == true))
        } else {
            setOverall(false)
        }
    }, [valid])

    return {...valid, overall}
}

export default useValidateProject