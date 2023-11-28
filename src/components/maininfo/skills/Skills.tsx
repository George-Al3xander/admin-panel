import { useQuery } from "react-query";
import Button from "../../reusable/Button"
import Title from "../../reusable/Title"

import { FaRankingStar } from "react-icons/fa6";
import { getDocs } from "firebase/firestore";
import { skillsCollectionRef } from "../../../firebase-config";
import { skill } from "../../../types/types";
import Skill from "./Skill";
import Modal from "../../Modal";
import { useState } from "react";



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
      const {data, isLoading, refetch, isRefetching} = useQuery({queryFn: getSkills, queryKey: ["skills"]})

      if(isLoading || isRefetching) {
        return <div>Loading</div>
      }

    return(<div>
            <Modal status={isPopupOpen}>
                <div onClick={closePopup} className="fixed left-0 right-0 top-0 bottom-0  bg-[rgba(0,0,0,.7)] z-[1000]"></div>         
                
            </Modal>
            <div className="mb-10 flex flex-col">
                <Title className="uppercase">skills</Title>
                <Button onClick={openPopup} className="text-lg ml-[auto]"><FaRankingStar size={20}/> New skill</Button>
            </div>
            <ul className="grid md:grid-cols-3 gap-5 mb-10">
                {data?.map((skill) => {
                    return <Skill skill={skill}/>
                })}
            </ul>

    </div>)
}

export default Skills