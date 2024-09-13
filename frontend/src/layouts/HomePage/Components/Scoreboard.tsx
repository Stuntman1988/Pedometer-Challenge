import {Progressbar} from "./Progressbar.tsx";
import {useEffect, useState} from "react";
import {TotalStepsOfUsers} from "../../../models/TotalStepsOfUsers.ts";
import {SpinnerLoading} from "../../utils/SpinnerLoading.tsx";
import {useTranslation} from "react-i18next";
import {AddStepsModal} from "./AddStepsModal.tsx";


export const Scoreboard = () => {

    const {t} = useTranslation();
    const [httpError, setHttpError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [totalSteps, setTotalSteps] = useState<TotalStepsOfUsers[]>([])
    const [newStepsAdded, setNewStepsAdded] = useState(false)

    useEffect(() => {
        const fetchTotalSteps = async () => {
            const url = `http://localhost:8080/api/stepsHistory/totalStepsOfUsers`
            const fetchTotalStepsResponse = await fetch(url)

            if (!fetchTotalStepsResponse.ok) {
                setIsLoading(false)
                setHttpError("Something went wrong")
            }

            const fetchTotalStepsResponseJson = await fetchTotalStepsResponse.json()
            const tempList: TotalStepsOfUsers[] = []
            for (const key in fetchTotalStepsResponseJson) {
                tempList.push({
                    name: fetchTotalStepsResponseJson[key].name,
                    totalSteps: fetchTotalStepsResponseJson[key].totalSteps
                })
            }

            setTotalSteps(tempList)
            setIsLoading(false)
            setNewStepsAdded(false)

        }
        fetchTotalSteps().catch((err) => {
            setHttpError(err.message)
            setIsLoading(false)
        })
    }, [newStepsAdded]);

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    return (
        <div className={'container mt-3'}>
            <h1 className={'text-center'}>{t('label_scoreboard')}</h1>
            <h5 className={'text-end'}>{t('goal_steps')}: 100000</h5>
            {totalSteps.map((t, index) => (
                <Progressbar data={t} key={index}/>
            ))}
            <div className={'mt-4'}>
                <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal"
                        data-bs-target="#addStepsModal">
                    {t('addSteps')}
                </button>
            </div>
            <AddStepsModal setNewStepsAdded={setNewStepsAdded}/>
        </div>
    )
}
