import './App.css'
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {Navbar} from "./layouts/NavbarAndFooter/Navbar.tsx";
import {HomePage} from "./layouts/HomePage/HomePage.tsx";
import {Scoreboard} from "./layouts/Scoreboard/Scoreboard.tsx";
import {AuthProvider} from "./auth/AuthContext.tsx";
import {LoginPage} from "./layouts/Login/LoginPage.tsx";
import {SecureRoute} from "./auth/SecureRoute.tsx";
import {Footer} from "./layouts/NavbarAndFooter/Footer.tsx";
import {Team} from "./layouts/Teams/Team.tsx";
import {RegisterUser} from "./layouts/RegisterUser/RegisterUser.tsx";
import {MyPage} from "./layouts/MyPage/MyPage.tsx";
import {SecretScoreboard} from "./layouts/SecretScoreboard/SecretScoreboard.tsx";

function App() {
    const location = useLocation();
    const hideNavbarAndFooter = location.pathname.endsWith("/secret-scoreboard")

    return (
        <>
            <AuthProvider>
                {!hideNavbarAndFooter && <Navbar/>}
                <Routes>
                    <Route path='/' element={<Navigate to='/home'/>}/>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterUser/>}/>
                    <Route path='/scoreboard' element={<SecureRoute comp={Scoreboard}/>}/>
                    <Route path='/team' element={<SecureRoute comp={Team}/>}/>
                    <Route path='/myPage' element={<SecureRoute comp={MyPage}/>}/>
                    <Route path='/secret-scoreboard' element={<SecretScoreboard/>}/>
                </Routes>
                {!hideNavbarAndFooter && <Footer/>}
            </AuthProvider>
        </>
    )
}

export default App
