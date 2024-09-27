import {useTranslation} from "react-i18next";


export const TopHome = () => {

    const {t} = useTranslation();

    return (
        <>
            <div className={'d-none d-md-flex align-items-center mt-4 p-4'}>
                <div className={'col-4'}>
                    <h5 className={'display-5'}>{t('topHomeText')}</h5>
                </div>
                <div className={'col-8'}>
                    <img src={'frontPic.png'} alt="picture" style={{width: '100%'}} className={'rounded'}/>
                </div>
            </div>

            <div className={'d-md-flex d-md-none align-items-center text-center mt-4 p-4'}>
                <div className={''}>
                    <h5 className={'display-6'}>{t('topHomeText')}</h5>
                </div>
                <div className={''}>
                    <img src={'frontPic.png'} alt="picture" style={{width: '95%'}} className={'rounded'}/>
                </div>
            </div>
        </>
    )
}
