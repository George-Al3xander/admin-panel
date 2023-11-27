import SkeletonProject from "./SkeletonProject"




const SkeletonProjects = () => {
    const arr = [1,2,3]

    return(<ul className="flex flex-col gap-10 mt-10">
        {arr.map(() => {
            return <SkeletonProject/>
        })}
    </ul>)
}

export default SkeletonProjects