import { cva } from "class-variance-authority";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}



export const buttonVariants = cva(
    "inline-flex uppercase items-center disabled:cursor-not-allowed justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2  dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:cursor-not-allowed dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
    {
        variants: {
           variant: {
            default: "hover:bg-primary mx-auto",
            accept: "text-green-600 hover:bg-green-600",
            reject: "text-red-600 hover:bg-red-600"
           },
           size: {
            default: "py-2 px-6",
            sm: "px-2",
           }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)


export const titleVariants = cva(
    "capitalize",
    {
        variants: {
            variant: {
                default: "bg-primary text-white",
                nobg: "bg-none text-primary"
            },
            size: {
                default: "py-2 px-2 ",
                sm: "px-2 text-sm",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)
