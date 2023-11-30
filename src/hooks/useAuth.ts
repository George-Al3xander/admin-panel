import { useEffect, useState } from "react"
import { user } from "../types/types"
import { useCookies } from "react-cookie";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { RVTool } from "regex-validation-tool";



export type  useAuthResult = ReturnType<typeof useAuth>

const useAuth = () => {
    const rvt = new RVTool()
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [userInput, setUserInput] = useState<user>({email: "", password: ""})
    const [loggedIn, setLoggedIn] = useState(false);
    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value}= e.target
        setUserInput((prev) => {
            return {...prev, [name]: value.trim()}
        })
    }


    useEffect(() => {
        const {email,password} = userInput
        const notBlank = rvt.customRegex(/\S/)
        setPasswordValid(notBlank(password))
        setEmailValid(rvt.isEmail(email))
    }, [userInput])

    

    const login = (userData: user) => {
        setIsLoading(true)
        setIsError(false)

        const {email,password} = userData
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {    
            setCookie("user",userData)
            setIsLoading(false)
            setIsError(false)
            setLoggedIn(true)
        })
        .catch((error) => {
            setIsLoading(false)
            setIsError(true)
            setLoggedIn(false)
    })
    }

    

    useEffect(() => {
        if(cookies.user && cookies.user.password.length > 0 && cookies.user.email.length > 0) {
            login(cookies.user);
        }else {
            setLoggedIn(false)   
        }  
    },[])

    return {loggedIn, handleChange, isLoading,login: () =>  login(userInput), emailValid, passwordValid, isError}
    
}


export default useAuth