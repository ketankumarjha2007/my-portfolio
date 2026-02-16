import {Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Project from "./Project";
import Navbar from "./Navbar";
import Footer from "./Footer";
function App(){
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/project" element={<Project/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}
export default App;