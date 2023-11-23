import { linksCollectionRef, storage } from "../../firebase-config";
import { getDocs } from "firebase/firestore";
import { description, links, linksDb } from "../../types/types";
import { useQuery } from "react-query";
import Description from "./Description";
import EditLinksWrapper from "./EditLinksWrapper";
import ImagesContainer from "./images/ImagesContainer";
import Links from "./Links";





const MainInfo = () => {  
      const getLinks = async () => {       
        const raw = await getDocs(linksCollectionRef)
                const links = raw.docs.map((doc) => ({...doc.data(), id: doc.id})) as linksDb         
        return links
      }
    
      

      const {data, isLoading, isError} = useQuery({queryFn: getLinks, queryKey: ["links"]})
      
      if(isLoading) {
        return <div>Loading...</div>
      }

      if(isError) {
        return <div>Error!</div>
      }

      
      const links = data?.find((obj) => Object.keys(obj).length == 4) as links    
      const description = data?.find((obj) => Object.keys(obj).length == 2) as description
      
    return(<div >    
          <ImagesContainer/>
          <Description desc={description}/>          
          <Links links={links}/>
    </div>)
}

export default MainInfo