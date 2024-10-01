import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {User} from "../../../models/User.ts";
import {useNavigate} from "react-router-dom";


export const CreateNewTeam: React.FC<{ user: User }> = (prop) => {

    const {t} = useTranslation();
    const [stepGoal, setStepGoal] = useState('');

    const navigate = useNavigate();

    const createNewTeam = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/team/createNewTeam?stepGoal=${Number(stepGoal)}&userId=${prop.user.id}`
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, headers);
        if (!response.ok) {
            throw new Error('Something went wrong') //TODO: Skapa felmeddelande.
        }
        const responseJson = await response.json()
        localStorage.setItem('teamToken', responseJson)
        navigate('/scoreboard')
        setStepGoal('')
    }

    return (
        <div className={'card'}>
            <div className={'card-header text-center'}>
                <div
                    className={'card-title fs-5'}>{t('createNewTeam')}.
                </div>
                <h6 className={'card-subtitle mb-2 text-body-secondary'}>{t('setATarget')}</h6>
            </div>
            <div className={'card-body text-center'}>
                <form className={'row justify-content-center align-items-center'}>
                    <div className={'col-4 text-end'}>
                        <label htmlFor={'teamIdInput'} className={'form-label'}>{t('stepGoal')}</label>
                    </div>
                    <div className={'col-4'}>
                        <input type={'number'} className={'form-control'} id={'teamIdInput'} value={stepGoal}
                               onChange={e => setStepGoal(e.target.value)}/>
                    </div>
                    <div className={'col-4 text-start'}>
                        <button type={'button'} className={'btn btn-success'} onClick={createNewTeam}
                                disabled={stepGoal === ''}>Start!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
