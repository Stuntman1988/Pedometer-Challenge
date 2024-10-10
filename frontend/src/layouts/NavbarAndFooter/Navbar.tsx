import {NavLink, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoePrints} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../auth/AuthContext.tsx";


export const Navbar = () => {

    const {t} = useTranslation()
    const {isLoggedIn, logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/home')
    }


    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container-fluid">
                <p className={'navbar-brand m-2'}>{t('head_label')} <FontAwesomeIcon icon={faShoePrints}/></p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to={'/home'} className="nav-link">{t('home')}</NavLink>
                        </li>
                        {isLoggedIn &&
                            <>
                                <li className="nav-item">
                                    <NavLink to={'/scoreboard'} className="nav-link">{t('Scoreboard')}</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item m-1'>
                            {isLoggedIn ?
                                <button type='button' className='btn btn-outline-danger' onClick={handleLogout}>
                                    {t('logOut')}
                                </button>
                                :
                                <a type='button' className='btn btn-outline-success' href='/login'>
                                    {t('signIn')}
                                </a>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
