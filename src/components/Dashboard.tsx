import { Navigate, Route, Routes } from "react-router-dom"
import Nav from "./Nav"
import MainInfo from "./maininfo/MainInfo"
import Projects from "./projects/Projects"
import { ToastContainer } from "react-toastify"
import Skills from "./maininfo/skills/Skills"






const Dashboard = () => {      
    return(<div className="flex flex-col md:flex-row"> 
        <ToastContainer/>       
          
        <Nav/>               
        <div className="md:pl-[10rem] w-[100%] mt-[20vh] md:mt-0">
        <div className="w-responsive mx-auto">
            <Routes>
                <Route element={<Navigate to={"/main-info"}/>} path={"/"}></Route>                
                <Route element={<MainInfo/>} path={"/main-info"}>Main info</Route>
                <Route element={<Projects />} path={"/projects"}>Projects</Route>
                <Route element={<Skills />} path={"/skills"}>Skills</Route>                
            </Routes>            
        </div>            
        </div>
    </div>)
}

export default Dashboard