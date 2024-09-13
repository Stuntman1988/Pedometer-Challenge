import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {Navbar} from "./layouts/NavbarAndFooter/Navbar.tsx";
import {HomePage} from "./layouts/HomePage/HomePage.tsx";

function App() {


    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Navigate to='/home'/>}/>
                <Route path='/home' element={<HomePage/>}/>
            </Routes>
        </div>
    )
}

export default App
