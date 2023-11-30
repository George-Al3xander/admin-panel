import { useState } from "react";
import useProjects from "../../hooks/useProjects"
import Button from "../reusable/Button.tsx";
import Title from "../reusable/Title"
import Project from "./Project"
import { MdAssignmentAdd } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonProjects from "./skeleton/SkeletonProjects.tsx";
import Modal from "../Modal.tsx";
import CreateProjectForm from "./create/CreateProjectForm.tsx";

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
    return(<div className="relative mb-10">       
            <div className="mb-10 flex flex-col">
                <Title className="uppercase">Projects</Title>
                <Button onClick={openPopup} className="text-lg ml-[auto]"><MdAssignmentAdd size={20}/>New project</Button>
            </div>
            <InfiniteScroll  dataLength={projects.length} next={fetchNextPage} hasMore={hasNextPage} loader={<SkeletonProjects />}>
            
            <Modal status={isPopupOpen}>
                <div onClick={closePopup} className="fixed left-0 right-0 top-0 bottom-0  bg-[rgba(0,0,0,.7)] z-[1000]"></div>         
                <CreateProjectForm refetch={refetch}  close={closePopup}/>
            </Modal>
            {/* <CreateProject refetch={refetch}  status={isPopupOpen} close={closePopup}/> */}
                <ul className="flex flex-col gap-10">
                    {projects.map((project) => {
                        return <Project refetch={refetch}  project={project}/>
                    })}
                </ul>
            </InfiniteScroll>
    </div>)
}

export default Projects