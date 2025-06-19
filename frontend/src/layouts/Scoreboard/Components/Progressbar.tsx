import * as React from 'react';
import {TotalStepsOfUsers} from "../../../models/TotalStepsOfUsers.ts";
import {useTranslation} from "react-i18next";
import {Team} from "../../../models/Team.ts";
import {useEffect, useState} from "react";

export const Progressbar: React.FC<{ data: TotalStepsOfUsers, newStepsAdded: boolean, team?: Team, diffInWeeks: number }> = (prop) => {

    const {t} = useTranslation()
    const [latestStepHistoryDate, setLatestStepHistoryDate] = useState('')

    const goalSteps = prop.team?.stepsGoal ?? 0
    const percentOfSteps = parseFloat(((prop.data.totalSteps / goalSteps) * 100).toFixed(1));


    useEffect(() => {
        const fetchStepsHistory = async () => {
            const stepHistoryUrl = `${import.meta.env.VITE_BACKEND_URL}/stepsHistories/search/findStepsHistoriesByUserId?userId=${prop.data.userId}`
            const stepsHistoryResponse = await fetch(stepHistoryUrl)

            if (!stepsHistoryResponse.ok) {
                return
            }

            const stepsHistoryResponseJson = await stepsHistoryResponse.json()
            const stepsHistoryResponseJsonData = stepsHistoryResponseJson._embedded.stepsHistories
            setLatestStepHistoryDate(stepsHistoryResponseJsonData.at(-1).createdAt)
        }
        fetchStepsHistory().catch((err) => {
            console.log(err)
        })
    }, [prop.newStepsAdded]);

    const parseDate = (date: string) => {
        const lastUpdatedUTC = new Date(date);
        return lastUpdatedUTC.toLocaleString(`${t('dateLanguage')}`);
    }

    const countAveragePerDay = (totSteps: number)=> {
        const startDate = new Date(prop.team?.createdAt ?? 0)
        const lastDate = new Date(latestStepHistoryDate)
        const diffTime = Math.abs(lastDate.getTime() - startDate.getTime())
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return Math.round(totSteps / diffDays)
    }

    return (
        <div className={'mt-3'}>
            <p className={'form-label mx-2'}>
                {prop.data.name} - {prop.data.totalSteps.toLocaleString('sv-SE')} {t('steps')} -
                <small className={'text-body-secondary'}> {countAveragePerDay(prop.data.totalSteps)} {t('StepPerDay')}</small>
                <small className={'d-block d-sm-inline float-sm-end'}>{t('LastUpdated')} {parseDate(latestStepHistoryDate)}</small>
            </p>
            <div className={'progress bg-light bg-opacity-25'} role={'progressbar'}
                 aria-label={'Animated striped example'}
                 aria-valuenow={percentOfSteps}
                 aria-valuemin={0} aria-valuemax={100}>
                <div className={'progress-bar progress-bar-striped progress-bar-animated bg-success overflow-visible'}
                     style={{width: `${percentOfSteps}%`}}>{percentOfSteps}%
                </div>
            </div>
        </div>
    )
}
