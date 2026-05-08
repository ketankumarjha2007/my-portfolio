import {Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Project from "./Project";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Contact from "./contact";
function App(){
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/project" element={<Project/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}
export default App;