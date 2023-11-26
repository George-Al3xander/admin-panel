import { useEffect, useState } from "react"
import { formData, project, skill } from "../types/types"
import { RVTool } from "regex-validation-tool";



const useFormData = (initialData?: project | skill) => {
    const [formData, setFormData] = useState<formData>({});
    const [statusChanges, setStatusChanges] = useState(false)
    const rvt = new RVTool()
    const notBlank = rvt.customRegex(/\S/)    
    const removeFromForm = (key: string) => {
        const temp = {...formData}
        delete temp[key as keyof formData]
        setFormData(temp)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.stopPropagation()
        const {name, value, files} = e.target as HTMLInputElement;
        //Input is a file
        if(files && files[0]) {           
            if(files[0].type === "image/svg+xml") {
                files[0].text().then((val) => {
                    setFormData(prev => {
                        return {...prev, [name]: val}
                    }) 
                }) 
                .catch((err) => {
                    console.log(err)
                    setFormData(prev => {
                        return {...prev, [name]: ""}
                    }) 
                })
            } else {
                setFormData(prev => {
                    return {...prev, [name]: files[0]}
                }) 
            }      
        //Input is a string     
        } else {
            if(initialData) {
                const initialValue = initialData[name as keyof formData]; 
                if(typeof initialValue === "boolean" || initialValue == undefined) {
                    const newValue = (value === "true");                     
                    if((typeof initialValue == "undefined" && newValue == false) || newValue == initialValue){   
                        removeFromForm(name)                    
                    } else {
                        setFormData(prev => {
                            return {...prev, [name]: newValue}
                        }) 
                        
                    }
                } else {
                    if(value == initialValue || !notBlank(value)) {
                        removeFromForm(name)
                    } else {               
                        setFormData(prev => {
                            return {...prev, [name]: value}
                        }) 
                    }
                }
            } else {
                const isBoolean = name.startsWith("is")
                if(isBoolean) {
                    const newValue = (value === "true"); 
                    setFormData(prev => {
                        return {...prev, [name]: newValue}
                    }) 
                } else {
                    if(!notBlank(value)) {
                        removeFromForm(name)
                        return
                    }
                
                    setFormData(prev => {
                        return {...prev, [name]: value}
                    })
                }
            }
        }        
    }
  
    //Checks if initial data somehow differs from the current form data
    useEffect(() => {        
        if(initialData) {
            const every = Object.keys(formData).map((key) => {
                const value = formData[key as keyof formData]
                const initialValue = initialData[key as keyof formData];          
                if(typeof value == "string") {
                    return (value == initialValue && notBlank(value))
                } else if(typeof value === "boolean"){   
                    if(typeof initialValue == "undefined"){                                 
                        if(value == false) {
                            return true
                        }
                        return false
                    } else {
                        return value == initialValue
                    }      
                } else {
                    return false                
                }     
            })
            if(every.length > 0) {
                setStatusChanges(every.every(el => el === false))
            } else {
                setStatusChanges(false)
            }  
        } else {
            if(Object.keys(formData).length > 4) {
                setStatusChanges(true)
            } else {
                setStatusChanges(false)
            }
        }
    }, [formData])
    
    

    return {formData, handleChange, statusChanges, removeFromForm}

}

export default useFormData