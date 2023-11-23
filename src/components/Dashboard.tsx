import { Route, Routes } from "react-router-dom"
import Header from "./Header"
import Nav from "./Nav"
import MainInfo from "./maininfo/MainInfo"
import Projects from "./projects/Projects"





const Dashboard = () => {


    return(<div className="flex flex-col md:flex-row">
        <Nav/>               
        <div className="md:pl-[12rem] md:pr-8 mt-[6rem] md:mt-0">            
            <Routes>
                <Route element={<MainInfo/>} path={"/main-info"}>Main info</Route>
                <Route element={<Projects />} path={"/projects"}>Projects</Route>
                <Route element={<h3>Skills</h3>} path={"/skills"}>Skills</Route>                
            </Routes>
        </div>
    </div>)
}

export default Dashboard