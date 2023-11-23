
//await e.target.files![0].text() - to covnert svg input to text file

import useProjects from "../../hooks/useProjects.ts"
import Title from "../reusable/Title"
import CreateProject from "./CreateProject.tsx"
import Project from "./Project"


const Projects = () => {
    const  {projects, isLoading,hasNextPage, fetchNextPage, isFetchingNextPage} = useProjects()
    

    if(isLoading) {
        return <div>Loading...</div>
    }
    return(<div className="relative">
        <Title>Projects</Title>
        <div className="bg-red-400">
            New project
            <CreateProject />
        </div>
        <ul className="flex flex-col gap-10">
            {projects.map((project) => {
                return <Project project={project}/>
            })}
        </ul>

        <div>
            {hasNextPage ? <button onClick={fetchNextPage}>Next</button> : null}
        </div>
        {isFetchingNextPage ? "Fetching" : null}
    </div>)
}

export default Projects