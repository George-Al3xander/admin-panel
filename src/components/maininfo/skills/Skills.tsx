import { useQuery } from "react-query";
import Button from "../../reusable/Button"
import Title from "../../reusable/Title"
import { FaRankingStar } from "react-icons/fa6";
import { addDoc, getDocs } from "firebase/firestore";
import { skillsCollectionRef } from "../../../firebase-config";
import { formData, skill } from "../../../types/types";
import Skill from "./Skill";
import Modal from "../../Modal";
import { useState } from "react";
import EditSkill from "./EditSkill";
import { toast } from "react-toastify";
import SkeletonSkills from "./skeleton/SkeletonSkills";



const Skills = () => {

    const getSkills = async ()  =>  {
        const data = await getDocs(skillsCollectionRef);
        let tempArray = data.docs.map((doc) => ({...doc.data(), id: doc.id})) as skill[]
        tempArray = tempArray.sort(({order:a}, {order:b}) => b-a).reverse();
        return tempArray 
      }
      const [isPopupOpen,setIsPopupOpen] = useState(false)
      const openPopup = () => setIsPopupOpen(true);
      const closePopup = () => setIsPopupOpen(false);
      const {data, isLoading, refetch, isRefetching} = useQuery({queryFn: getSkills, queryKey: ["skills"], refetchOnWindowFocus: false})
      const notifyErr = (msg:string) => toast.error(msg);
      const notifySucces = (msg:string) => toast.success(msg);
      
      const createSkill = async (formData: formData) => {
        const temp = formData
        // @ts-ignore
        temp.order = +formData.order
       const docRef = await addDoc(skillsCollectionRef, temp);

        if(docRef.id) {
            notifySucces("Skill added")
            refetch()
            closePopup()
        } else {
            notifyErr("Failed to create new skill")
        }
        
      }

      if(isLoading || isRefetching ) {
        return <SkeletonSkills />
      
      }

    return(<div>
            <Modal status={isPopupOpen}>
                <div onClick={closePopup} className="fixed left-0 right-0 top-0 bottom-0  bg-[rgba(0,0,0,.7)] z-[1000]"></div>         
                <div className="translate-y-[-50%] translate-x-[-50%] fixed z-[1000] top-[50%] left-[50%] bg-white rounded-lg w-[80%]">
                    <EditSkill handleStatus={closePopup}  mutate={createSkill}/>
                </div>
            </Modal>
            <div className="mb-10 flex flex-col">
                <Title className="uppercase">skills</Title>
                <Button onClick={openPopup} className="text-lg ml-[auto]"><FaRankingStar size={20}/> New skill</Button>
            </div>
            <ul className="grid md:grid-cols-3 gap-5 mb-10">
                {data?.map((skill) => {
                    return <Skill refetch={() => {
                        refetch()
                        closePopup()
                    }} skill={skill}/>
                })}
            </ul>

    </div>)
}

export default Skills