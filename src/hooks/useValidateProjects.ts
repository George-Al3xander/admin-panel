import { useEffect, useState } from "react"
import { formData, project } from "../types/types"
import { RVTool } from "regex-validation-tool"

type valid = {
    valid_description: boolean,    
    valid_name: boolean,
    valid_url_github: boolean,
    valid_url_preview: boolean,  
    valid_created_at: boolean,
}

type projectValid  = Partial<valid>



const useValidateProjects = (formData: formData) => {
    const [valid, setValid] = useState<projectValid>({})
    const [overall, setOverall]= useState(false)
    const rvt = new RVTool()
    const notBlank = rvt.customRegex(/\S/);

    const checkFieldExists = (obj: project | formData) => {
        const keysObj = Object.keys(obj);
        const keysValid = Object.keys(valid);
        let tempObj = valid
        keysObj.forEach((key) => {
            if(!keysValid.includes("valid_" + key)) {
                delete tempObj["valid_" + key as keyof valid]
            } 
        }) 
        setValid(tempObj)       
    }

    const checkProjectLike = (obj: project | formData) => { 
        const keys = Object.keys(obj);
        keys.forEach((key) => {
            const path = "valid_" + key  
            if(key.startsWith("url")) {                    
                const isUrl =  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig.test(obj[key as "id"] as string)
                
                setValid((prev) => {
                    return {...prev, [path]:isUrl}
                })                     
            }  
            else if(key == "description" || key == "name" || key == "created_at") { 
                setValid((prev) => {
                    return {...prev, [path]: notBlank(obj[key as "id"] as string)}
                })
            }  
        })
    }

    useEffect(() => {
        const keys = Object.keys(formData)       
        checkFieldExists(formData)
        if(keys.length > 0) {
            checkProjectLike(formData)
        } 
    }, [formData])

    useEffect(() => {        
        setOverall(Object.values(valid).every((el) => el == true))
    }, [valid])

    return {...valid, overall}
}

export default useValidateProjects