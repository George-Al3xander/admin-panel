
//await e.target.files![0].text() - to covnert svg input to text file

import { useState } from "react";
import useProjects from "../../hooks/useProjects"
import Button from "../reusable/Button.tsx";
import Title from "../reusable/Title"
import CreateProject from "./create/CreateProject.tsx"
import Project from "./Project"
import { MdAssignmentAdd } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonProjects from "./skeleton/SkeletonProjects.tsx";

const Projects = () => {
    const  {projects, isLoading,hasNextPage, fetchNextPage, refetch} = useProjects()
    const [isPopupOpen,setIsPopupOpen] = useState(false)
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    if(isLoading) {
        return <div>
            <div className="flex flex-col">
                <Title className="uppercase">Projects</Title>
                <Button disabled onClick={openPopup} className="text-lg ml-[auto]"><MdAssignmentAdd size={20}/>New project</Button>
            </div>
            <SkeletonProjects />
            </div>
    }    
    return(<div className="relative">       
            <div className="mb-10 flex flex-col">
                <Title className="uppercase">Projects</Title>
                <Button onClick={openPopup} className="text-lg ml-[auto]"><MdAssignmentAdd size={20}/>New project</Button>
            </div>
            <CreateProject refetch={refetch}  status={isPopupOpen} close={closePopup}/>
            <InfiniteScroll dataLength={projects.length} next={fetchNextPage} hasMore={hasNextPage} loader={<SkeletonProjects />}>
                <ul className="flex flex-col gap-10">
                    {projects.map((project) => {
                        return <Project refetch={refetch}  project={project}/>
                    })}
                </ul>
            </InfiniteScroll>
    </div>)
}

export default Projects