import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useQuery } from "react-query";
import { storage } from "../../../firebase-config";
import EditImage from "./EditImage";
import { picture } from "../../../types/types";
import Title from "../../reusable/Title";
import SkeletonImages from "../skeleton/SkeletonImages";




const ImagesContainer = () => {
    const getPictures = async () => {
        const myselfPicsRef = ref(storage, "myself/")
        const myselfPics = await (await listAll(myselfPicsRef)).items.map(async (item) => {
          const url = await getDownloadURL(item);          
          return {name: item.name.split(".")[0], url, fullName:item.name} as picture;  
        })
        return await Promise.all(myselfPics)    
    }

      const {data, isLoading, isError, refetch, isRefetching} = useQuery({queryFn: getPictures, queryKey: ["images"], refetchOnWindowFocus: false})
      if(isLoading  || isRefetching) {
        return <SkeletonImages />
      }

      if(isError) {
        return <div>Error!</div>
      }
      const pic_header = data!.find((pic) => pic.name == "pic_header")!
      const pic_footer = data!.find((pic) => pic.name == "pic_footer")!
    

    return(<div >
        <Title>Photos</Title>       
        <div className="flex gap-4 md:flex-row flex-col  justify-between p-4">
          <EditImage refetch={refetch} image={pic_header} />
          <EditImage refetch={refetch} image={pic_footer} />
        </div>
      </div> )
}

export default ImagesContainer