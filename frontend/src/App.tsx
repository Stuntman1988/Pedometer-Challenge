import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {Navbar} from "./layouts/NavbarAndFooter/Navbar.tsx";
import {HomePage} from "./layouts/HomePage/HomePage.tsx";
import {Scoreboard} from "./layouts/Scoreboard/Scoreboard.tsx";
import {AuthProvider} from "./auth/AuthContext.tsx";
import {LoginPage} from "./layouts/Login/LoginPage.tsx";
import {SecureRoute} from "./auth/SecureRoute.tsx";
import {Footer} from "./layouts/NavbarAndFooter/Footer.tsx";

function App() {


    return (
        <>
            <AuthProvider>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Navigate to='/home'/>}/>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/scoreboard' element={<SecureRoute comp={Scoreboard}/>}/>
                </Routes>
                <Footer/>
            </AuthProvider>
        </>
    )
}

export default App
