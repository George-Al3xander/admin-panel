import { skill } from "../../../types/types"
import { useRef, useState } from "react"
import Button from "../../reusable/Button"
import AcceptRejectBtns from "../../reusable/AcceptRejectBtns"
import useFormData from "../../../hooks/useFormData"
import parse from 'html-react-parser';


const EditSkill = ({skill, handleStatus, mutate, refetch}: {skill?: skill, handleStatus: Function, mutate: Function, refetch?:Function}) => {

    const {formData,handleChange, statusChanges, removeFromForm} = useFormData(skill);
    const [iconInput, setIconInput] = useState("file");
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleIconChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;       
        setIconInput(value)
    }

    const handleDefaultValue = (key: keyof skill) => {
        if(skill) {   
           return skill[key] as string
        }
        return ""
    }
    const resetIcon = () => {
        if(fileInputRef.current) {
            fileInputRef.current.value = ""
            removeFromForm("icon")         
        }
    }
    
    const fileClick = () => {
        if(fileInputRef.current) {
            fileInputRef.current.click()           
        }
    }
    // @ts-ignore
    const {icon} = formData;
    return(<form className="border-2 p-2  rounded mx-auto bg-white" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="border-b-2 flex gap-4 py-2 flex-col">
                <div className="flex justify-between flex-wrap">
                    <h3 className="font-bold capitalize">Icon: </h3>   
                    <ul className="flex gap-4 flex-wrap">
                        <label className="font-medium flex gap-1 items-center" htmlFor="icon_input_file"><input onChange={handleIconChoice}checked={iconInput == "file"} value="file"  type="radio" name="icon_input" id="icon_input_file" />Import a file</label>
                        <label className="font-medium flex gap-1 items-center" htmlFor="icon_input_text"><input onChange={handleIconChoice}checked={iconInput == "text"} value="text" type="radio" name="icon_input" id="icon_input_text" />Text input</label>
                    </ul>

                </div>

                <div className="mx-auto">
                    <div className="flex justify-center">
                        <h2 className="font-bold italic mx-auto">Preview</h2>
                    </div>

                    {icon ? 
                        <div className="max-w-[4rem] mx-auto my-4">
                        {parse(icon)}
                        </div> 
                        : 
                        <h2 className="my-4 font-medium">No icon selected</h2>
                    }    

                    {iconInput == "file" ?
                    <div className="flex justify-center flex-col">
                        <Button variant="accept" onClick={fileClick}>Select file</Button>
                        <Button disabled={icon ? false : true}  className="mx-auto" variant="reject" onClick={resetIcon}>Reset</Button>
                    </div>                
                    :
                    <input defaultValue={icon ? icon : ""} placeholder="<svg>...</svg>"  className="border-b-2 border-primary" type="text" name="icon" onChange={handleChange} id="icon_text" />
                        
    
                    }
                </div>
                
                <div>
                </div>
                <input id="test" ref={fileInputRef} className="border-b-2 border-primary  max-w-[100%] hidden" multiple={false} type="file" name="icon" accept="image/svg+xml" onChange={handleChange}/>
            </fieldset>
            <fieldset className="border-b-2 flex gap-4 py-2 flex-wrap">
                <h3 className="font-bold capitalize">Title: </h3>
                <input className="border-b-2 border-primary" type="text" name="name" onChange={handleChange} defaultValue={handleDefaultValue("name")}/>
            </fieldset>
            <fieldset className="border-b-2 flex gap-4 py-2 flex-wrap">
                <h3 className="font-bold capitalize">Order: </h3>           
                <input min={0} className="border-b-2 border-primary" type="number" name="order" onChange={handleChange} defaultValue={handleDefaultValue("order")}/>
            </fieldset>
            <AcceptRejectBtns accept={() => mutate(formData)} reject={handleStatus} condtion={!statusChanges}/>
        </form>)
}

export default EditSkill