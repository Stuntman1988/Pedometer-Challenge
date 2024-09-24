import {AddToTeamRequest} from "../../../models/AddToTeamRequest.ts";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {User} from "../../../models/User.ts";
import {useNavigate} from "react-router-dom";


export const AddToTeam: React.FC<{ user: User }> = (prop) => {

    const {t} = useTranslation();
    const [addToTeamError, setAddToTeamError] = useState('')
    const [teamId, setTeamId] = useState('')
    const navigate = useNavigate()

    const addMeToTeam = async () => {
        const addToTeamRequest = new AddToTeamRequest(prop.user?.id, Number(teamId))
        const url = `http://localhost:8080/api/users/addToTeam`
        const headers = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addToTeamRequest)
        }
        const addToTeamResponse = await fetch(url, headers)

        if (!addToTeamResponse.ok) {
            setAddToTeamError('Team not found!')
            return
        }

        localStorage.setItem('teamToken', teamId)
        setAddToTeamError('')
        setTeamId('')
        navigate('/scoreboard')
    }

    return (
        <div className={'card'}>
            <div className={'card-header text-center'}>
                <div className={'card-title fs-5'}>
                    {prop.user?.name.includes(' ') ?
                        prop.user.name.substring(0, prop.user.name.indexOf(' '))
                        :
                        prop.user.name
                    }, {t('teamNotAMember')}
                </div>
                <h6 className={'card-subtitle mb-2 text-body-secondary'}>{t('putInAId')}</h6>
            </div>
            <div className={'card-body text-center'}>
                <form className={'row justify-content-center align-items-center'}>
                    <div className={'col-4 text-end'}>
                        <label htmlFor={'teamIdInput'} className={'form-label'}>Team ID</label>
                    </div>
                    <div className={'col-4'}>
                        <input type={'number'} className={'form-control'} id={'teamIdInput'} value={teamId}
                               onChange={e => setTeamId(e.target.value)}/>
                    </div>
                    <div className={'col-4 text-start'}>
                        <button type={'button'} className={'btn btn-success'} onClick={addMeToTeam}
                                disabled={teamId === ''}>{t('addMe')}
                        </button>
                    </div>
                </form>
                {addToTeamError !== '' &&
                    <p className={'text-danger'}>{addToTeamError}</p>
                }
            </div>
        </div>
    )
}
