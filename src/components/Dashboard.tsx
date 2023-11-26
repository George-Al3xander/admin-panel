import { Route, Routes } from "react-router-dom"
import Header from "./Header"
import Nav from "./Nav"
import MainInfo from "./maininfo/MainInfo"
import Projects from "./projects/Projects"
import { ToastContainer } from "react-toastify"






const Dashboard = () => {
    const oldStyles = "md:pl-[12rem] md:pr-8 mt-[6rem] md:mt-0 px-10 w-[100%]"   
    return(<div className="flex flex-col md:flex-row"> 
        <ToastContainer/>       
          
        <Nav/>               
        <div className="md:pl-[10rem] w-[100%] mt-[20vh] md:mt-0">
        <div className="w-responsive mx-auto">
            <Routes>
                <Route element={<MainInfo/>} path={"/main-info"}>Main info</Route>
                <Route element={<Projects />} path={"/projects"}>Projects</Route>
                <Route element={<h3>Skills</h3>} path={"/skills"}>Skills</Route>                
            </Routes>            
        </div>            
        </div>
    </div>)
}

export default Dashboard