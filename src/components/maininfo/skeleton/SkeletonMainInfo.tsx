import SkeletonImages from "./SkeletonImages"
import SkeletonLink from "./SkeletonLink"




const SkeletonMainInfo = () => {
    const names = ["description","github", "email", "linkedin"]
    return(<div>
        <SkeletonImages/>
        {names.map((name) => {
            return <SkeletonLink name={name}/>
        })}
    </div>)
}

export default SkeletonMainInfo