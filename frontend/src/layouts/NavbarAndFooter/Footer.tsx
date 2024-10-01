import {useTranslation} from "react-i18next";
import i18n from "../../config/i18n.ts";

export const Footer = () => {

    const {t} = useTranslation()

    const changeLanguage = () => {
        if (i18n.language === 'en') {
            i18n.changeLanguage('sv')
        } else {
            i18n.changeLanguage('en')
        }
    }

    return (
        <>
            <footer className={'d-flex align-items-center px-3 py-3 bg-body-tertiary fixed-bottom'}>
                <p className={'col-md-6 mb-0'}>© {t('head_label')}
                </p>
                <div className={'d-flex align-items-center mt-2 ms-auto'}>
                    <p className={'me-2 mb-1 fs-6'}>{t('change_lng')}:</p>
                    <button
                        className={'btn border border-success d-flex justify-content-center align-items-center'}
                        style={{width: '35px', height: '25px'}}
                        onClick={() => changeLanguage()}>
                        <span className={'mb-1'}>{i18n.language}</span>
                    </button>
                </div>
            </footer>
        </>
    )
}
