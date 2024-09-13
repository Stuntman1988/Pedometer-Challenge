import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoePrints} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";


export const Navbar = () => {

    const {i18n, t} = useTranslation()

    const changeLanguage = () => {
        if (i18n.language === 'en') {
            i18n.changeLanguage('sv')
        } else {
            i18n.changeLanguage('en')
        }
    }


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                    </ul>
                    <div className={'d-flex align-items-center ms-auto'}>
                        <p className={'me-2 mb-1 fs-6'}>{t('change_lng')}:</p>
                        <button
                            className={'btn border border-success d-flex justify-content-center align-items-center'}
                            style={{width: '35px', height: '25px'}}
                            onClick={() => changeLanguage()}>
                            <span className={'mb-1'}>{i18n.language}</span>
                        </button>
                    </div>
                </div>

            </div>
        </nav>
    )
}
