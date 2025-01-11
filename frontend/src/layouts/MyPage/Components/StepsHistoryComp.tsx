import {AddStepsModal} from "../../Scoreboard/Components/AddStepsModal.tsx";
import React from "react";
import {User} from "../../../models/User.ts";
import {StepsHistory} from "../../../models/StepsHistory.ts";
import {useTranslation} from "react-i18next";


export const StepsHistoryComp: React.FC<{
    user: User,
    stepsHistoryOfUser: StepsHistory[],
    totalSteps: number,
    setNewStepsAdded?: (value: boolean) => void
}> = (prop) => {

    const {t} = useTranslation();

    const parseDate = (date: Date) => {
        const newDate = new Date(date)
        return new Intl.DateTimeFormat(`${t('dateLanguage')}`, {dateStyle: "medium"}).format(newDate);
    }

    const parseTime = (date: Date) => {
        const newDate = new Date(date)
        return new Intl.DateTimeFormat(`${t('dateLanguage')}`, {timeStyle: "short"}).format(newDate);
    }

    const removeSteps = async (stepId: number) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/stepsHistory/deleteStepsHistory?stepId=${stepId}`
        const headers = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const fetchDeleteFetchHistory = await fetch(url, headers)

        if (!fetchDeleteFetchHistory) {
            console.log("Skapa en popup med fel") //TODO
            return
        }

        prop.setNewStepsAdded?.(true)

    }

    return (
        <>
            <div className={'overflow-y-auto'}
                 style={{maxHeight: "350px", width: "100%", overflowX: "hidden"}}>

                {prop.stepsHistoryOfUser.map(sh => (
                    <li className='border card-text mb-1' key={sh.id}
                        style={{listStyle: "none"}}>
                        <div className='row p-1'>
                            <p className='col-4 mb-0'>{sh.steps} {t('steps')}</p>
                            <p className='col-5 col-md-6 mb-0'>{parseDate(sh.createdAt)} - {parseTime(sh.createdAt)}</p>
                            <button className={'col-2 btn btn-danger btn-sm ms-2'}
                                    style={{maxWidth: "65px"}} onClick={() => removeSteps(sh.id)}>{t('Delete')}
                            </button>
                        </div>
                    </li>
                ))}
            </div>
            <div className={''}>
                <h6 className={'mx-1 mt-2'}>{prop.totalSteps} {t('TotalNumberOfSteps')}</h6>
            </div>
            <button className={'btn btn-success mt-2'} data-bs-toggle="modal"
                    data-bs-target="#addStepsModal">{t('addSteps')}</button>

            <AddStepsModal setNewStepsAdded={prop.setNewStepsAdded} teamId={prop.user?.teamId?.toString()} user={prop.user} fromMyPage={true}/>

        </>

    )
}
