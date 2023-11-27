import { DocumentData, Query, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import {ref, listAll,getDownloadURL} from "firebase/storage"
import { storage } from "../firebase-config"
import { projectsCollectionRef } from '../firebase-config';
import { formData, project } from "../types/types";
import {createContext, useContext, useEffect, useState} from "react"



const useProjects = () => {
    const imageListRef = ref(storage, "images/");
    
    const [images, setImages] = useState<any[]>([])
    const [lastVisible, setLastVisible] = useState<any>()
    const [projects, setProjects]  = useState<project[]>([])
    const [isLoading,setIsLoading] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [isFetchingNextPage,setIsFetchingNextPage] = useState(false);

    const getProjectsFromDb = async (ref: Query<DocumentData>) => {       
        const snapshots = await getDocs(ref);         
        setLastVisible(snapshots.docs[snapshots.docs.length-1])        
        let tempArray = snapshots.docs.map((doc) => ({...doc.data(), id: doc.id}));       
        let tempImages = images
        if(images.length == 0) {
          const imagesDb  = await listAll(imageListRef)        
          setImages(imagesDb.items)
          tempImages = imagesDb.items
        } 
        
        const resultPromise =  tempArray.map(async (doc) => {
            const image = tempImages.find((img) =>  img.name.split(".")[0] == doc.id)
            const url = await getDownloadURL(image!)  
            return {...doc, img: {name: image.name.split(".")[0], url, fullName:image.name}};  
        })
        const result = await  Promise.all(resultPromise)  as project[]
        return result
    }

    const getProjects = async () => {        
        setIsLoading(true)
        const result = await getProjectsFromDb(query(projectsCollectionRef, limit(6), orderBy("created_at","desc")))
        setProjects(result)
        setIsLoading(false)
      }
      
      const fetchNextPage = async () => {
        setIsFetchingNextPage(true)
        const next = query(projectsCollectionRef, limit(6), orderBy("created_at","desc"), startAfter(lastVisible));        
        const result = await getProjectsFromDb(next)      
        setProjects((prev) => [...prev, ...result])
        setIsFetchingNextPage(false)       
      }
   
    useEffect(() => {
        getProjects()
    },[])

    useEffect(() => {      
       if(projects.length % 6 != 0) {
            setHasNextPage(false)            
       }     
    },[projects])
    
    const handleProjectLocally = (newValue: formData | project, oldValue?: project)  => {
      if(oldValue) {
          let tempArray = projects
          const index = projects.findIndex((el) => el.id == oldValue.id);
          const newObj = Object.assign(oldValue, newValue)
          tempArray[index] = newObj
          setProjects(tempArray);
        } else {
          let tempArray = projects;
          tempArray.push(newValue as project);
          tempArray = tempArray.sort((a,b) =>  new Date(b.created_at).valueOf()  - new Date(a.created_at).valueOf() )
          setProjects(tempArray)
        }      
    }
   
    
    return {projects, isLoading,fetchNextPage,hasNextPage ,isFetchingNextPage, handleProjectLocally}
}


type ProjectsResult = Partial<ReturnType<typeof useProjects>>

export const ProjectsContext = createContext<ProjectsResult>({
  handleProjectLocally: () => {}
})


export const ProjectsProvider = ({children,value}: {children: React.ReactNode, value: ProjectsResult}) => (
  <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
)


export const useHandleProjectLocally = () => {
  const {handleProjectLocally} =  useContext(ProjectsContext)
  return handleProjectLocally
}

export default useProjects