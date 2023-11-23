import { useRef } from "react"
import { project } from "../../types/types"




const ProjectForm = ({project, handleChange, onImageChange, resetImgCallback}: {project?: project,resetImgCallback?: Function ,onImageChange: any ,handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void}) => {
    const handleDefaultValue = (key: keyof project) => {
        if(project) {
           return project[key] as string
        }
        return ""
    }
    const imgInputRef = useRef<HTMLInputElement>(null)

     const resetImg = (callback?:  Function) => {
      if(imgInputRef.current) {
      if(callback) callback()        
         imgInputRef.current.value = ""
      }
    } 

    return(<form onSubmit={(e) => e.preventDefault()} key={`edit-${handleDefaultValue("id")}`}>
        {/* {isHidden ? <BiSolidHide /> : <BiSolidShow/>} */}
        <fieldset  className="max-w-[20rem]">
            <input ref={imgInputRef} multiple={false} type="file" name="img" accept="image/*" onChange={onImageChange}/>
            <button onClick={() => resetImg(resetImgCallback)}>Reset</button>
        </fieldset>
        <fieldset>
           <h3>Title: </h3>
           <input type="text" name="name" onChange={handleChange} defaultValue={handleDefaultValue("name")}/>
        </fieldset>
        <fieldset>
           <h3>github: </h3>
           <input type="text" name="url_github" onChange={handleChange} defaultValue={handleDefaultValue("url_github")}/>

        </fieldset>
        <fieldset>
           <h3>preview:</h3>
           <input type="text" name="url_preview" onChange={handleChange} defaultValue={handleDefaultValue("url_preview")}/>

        </fieldset>
        <fieldset>
           <h3>IsFullstack: </h3>
           <select onChange={handleChange} defaultValue={project ? project.isFullstack ? "true" : "false" : ""} name="isFullstack" id="">
                <option value="true">True</option>
                <option value="false">False</option>
           </select>
        </fieldset>
        <fieldset>
           <h3>IsHidden: </h3>
           <select onChange={handleChange} defaultValue={project ? project.isHidden ? "true" : "false" : ""} name="isHidden" id="">
                <option value="true">True</option>
                <option value="false">False</option>
           </select>
        </fieldset>
        <fieldset>
            <h3>Description: </h3>
            <textarea onChange={handleChange} name="description" defaultValue={handleDefaultValue("description")} id="" cols={30} rows={10}></textarea>
        </fieldset>     
    </form>)
}

export default ProjectForm