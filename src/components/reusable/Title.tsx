
import { VariantProps } from "class-variance-authority"
import {FC , } from "react"
import { cn, titleVariants } from "./utils"


interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof titleVariants>  {}

const Title : FC<TitleProps> = ({variant, size,className,...props}) => {


    return <h3 className={cn(titleVariants({variant, size, className}))} {...props}/>

}


export default Title