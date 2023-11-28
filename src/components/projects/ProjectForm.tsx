import {   useRef } from "react"
import { project } from "../../types/types"
import moment from "moment"
import Button from "../reusable/Button"
import { RVTool } from "regex-validation-tool"
import {toast } from 'react-toastify';


const ProjectForm = ({project, handleChange, onImageChange, resetImgCallback}: {project?: project,resetImgCallback?: Function ,onImageChange: any ,handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void}) => {
   const imgInputRef = useRef<HTMLInputElement>(null)
   const repoInputRef = useRef<HTMLInputElement>(null)
   const dateInputRef = useRef<HTMLInputElement>(null)
   const rvt = new RVTool();
   const notifyGhErr = () => toast.error("Invalid GitHub link");
   const notifyGhSucces = () => toast.success("Fetched");

   const handleDefaultValue = (key: keyof project) => {
        if(project) {
            if(key == "created_at") {
               return moment(new Date(project.created_at)).format("YYYY-MM-DD").toString()
            }
           return project[key] as string
        }
        return ""
   }

   const resetImg = (callback?:  Function) => {
      if(imgInputRef.current) {
         if(callback) callback();        
         imgInputRef.current.value = "";
      }
   } 

   const fetchFromGh = async () => {
      if(repoInputRef.current && dateInputRef.current) {
         const {value} = repoInputRef.current        
         try {
            if(!rvt.isUrl(value)) throw new Error("Invalid GitHub link")
               const username = value.split("/")[3]
               const reponame = value.split("/")[4]
               const url = `https://api.github.com/repos/${username}/${reponame}`
               const res = await fetch(url);
            if(res.status != 200) throw new Error("Invalid github link")            
               const data = await res.json();
               const date = data.created_at;
               console.log("Are you retarted?")
               const valueFormat = moment(new Date(date)).format("YYYY-MM-DD").toString()            
               dateInputRef.current.value = valueFormat
               notifyGhSucces()
         } catch (error) {              
            notifyGhErr()      
            repoInputRef.current.focus()
         }
      }
   }


    return(<form className="border-2 p-2  rounded mx-auto" onSubmit={(e) => e.preventDefault()} key={`edit-${handleDefaultValue("id")}`}>              
        <fieldset  className="h-[10rem] flex-col flex justify-center items-center">
            <input className="border-b-2 border-primary" ref={imgInputRef} multiple={false} type="file" name="img" accept="image/*" onChange={onImageChange}/>
            <button onClick={() => resetImg(resetImgCallback)}>Reset</button>
        </fieldset>
        <fieldset className="border-b-2 flex gap-4 py-2 flex-wrap">
           <h3 className="font-bold capitalize">Title: </h3>
           <input className="border-b-2 border-primary" type="text" name="name" onChange={handleChange} defaultValue={handleDefaultValue("name")}/>
        </fieldset>

        <fieldset className="border-b-2 flex gap-4 py-2 flex-wrap">
            <h3 className="font-bold capitalize">Created at</h3>
            <div className="flex flex-col gap-4">
               <input ref={dateInputRef} className="border-b-2 border-primary" onChange={handleChange}  type="date" defaultValue={handleDefaultValue("created_at")} name="created_at" id="" />
               <Button onClick={fetchFromGh}>fetch from the github repo</Button>
            </div>
         </fieldset>  

        <fieldset className="border-b-2 flex gap-4 py-2 flex-wrap">
           <h3 className="font-bold capitalize">github: </h3>
           <input tabIndex={3} ref={repoInputRef} className="border-b-2 border-primary" type="text" name="url_github" onChange={handleChange} defaultValue={handleDefaultValue("url_github")}/>
        </fieldset>

        <fieldset className="border-b-2 flex gap-4 py-2 flex-wrap">
           <h3 className="font-bold capitalize">preview:</h3>
           <input className="border-b-2 border-primary" type="text" name="url_preview" onChange={handleChange} defaultValue={handleDefaultValue("url_preview")}/>
        </fieldset>

        <fieldset className="border-b-2 flex gap-4 py-2 flex-wrap">
           <h3 className="font-bold capitalize">IsFullstack: </h3>
           <select onChange={handleChange} defaultValue={project ? project.isFullstack ? "true" : "false" : ""} name="isFullstack" id="">
                <option value="false">False</option>
                <option value="true">True</option>
           </select>
        </fieldset>
        <fieldset className="border-b-2 flex gap-4 py-2 flex-wrap">
           <h3 className="font-bold capitalize">IsHidden: </h3>
           <select onChange={handleChange} defaultValue={project ? project.isHidden ? "true" : "false" : ""} name="isHidden" id="">
                <option value="false">False</option>
                <option value="true">True</option>
           </select>
        </fieldset>
        <fieldset className="border-b-2 flex gap-4 py-2 flex-wrap">
            <h3 className="font-bold capitalize">Description: </h3>
            <textarea className="p-2 border-b-2 border-primary"  onChange={handleChange} name="description" defaultValue={handleDefaultValue("description")} id="" cols={30} rows={1}></textarea>
        </fieldset>           
    </form>)
}

export default ProjectForm