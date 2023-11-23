import { ButtonHTMLAttributes, FC } from "react"

import { VariantProps, cva } from "class-variance-authority"
import { buttonVariants, cn } from "./utils"



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>{}


const Button : FC<ButtonProps> = ({className,size,variant,...props}) => {

    return <button className={cn(buttonVariants({variant,size,className}))} {...props}/>
}

export default Button
