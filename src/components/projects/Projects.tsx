
//await e.target.files![0].text() - to covnert svg input to text file

import { useState } from "react";
import useProjects, { ProjectsProvider } from "../../hooks/useProjects"
import Button from "../reusable/Button.tsx";
import Title from "../reusable/Title"
import CreateProject from "./create/CreateProject.tsx"
import Project from "./Project"
import { MdAssignmentAdd } from "react-icons/md";

const Projects = () => {
    const  {projects, isLoading,hasNextPage, fetchNextPage, isFetchingNextPage, handleProjectLocally} = useProjects()
    const [isPopupOpen,setIsPopupOpen] = useState(false)
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    if(isLoading) {
        return <div>Loading...</div>
    }    
    return(<div className="relative">
        <ProjectsProvider value={{handleProjectLocally}}>
            <div className="mb-10 flex flex-col">
                <Title className="uppercase">Projects</Title>
                <Button onClick={openPopup} className="text-lg ml-[auto]"><MdAssignmentAdd size={20}/>New project</Button>
            </div>
            <CreateProject  status={isPopupOpen} close={closePopup}/>
            <ul className="flex flex-col gap-10">
                {projects.map((project) => {
                    return <Project project={project}/>
                })}
            </ul>

            <div>
                {hasNextPage ? <button onClick={fetchNextPage}>Next</button> : null}
            </div>
            {isFetchingNextPage ? "Fetching" : null}
        </ProjectsProvider>
        
    </div>)
}

export default Projects