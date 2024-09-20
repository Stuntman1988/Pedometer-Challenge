import {Progressbar} from "./Components/Progressbar.tsx";
import {useEffect, useState} from "react";
import {TotalStepsOfUsers} from "../../models/TotalStepsOfUsers.ts";
import {SpinnerLoading} from "../Utils/SpinnerLoading.tsx";
import {useTranslation} from "react-i18next";
import {AddStepsModal} from "../Utils/AddStepsModal.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";
import {useNavigate} from "react-router-dom";


export const Scoreboard = () => {

    const {t} = useTranslation();
    const {isLoggedIn} = useAuth()
    const navigate = useNavigate();
    const [httpError, setHttpError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [totalSteps, setTotalSteps] = useState<TotalStepsOfUsers[]>([])
    const [newStepsAdded, setNewStepsAdded] = useState(false)
    const [teamToken] = useState<string | null>(localStorage.getItem("teamToken"));
    const [teamId, setTeamId] = useState('')


    useEffect(() => {
        const fetchTotalSteps = async () => {
            if (isLoggedIn && teamToken) {
                const url = `http://localhost:8080/api/stepsHistory/totalStepsOfUsers?teamId=${teamToken}`
                setTeamId(teamToken)
                    const fetchTotalStepsResponse = await fetch(url)

                    if (!fetchTotalStepsResponse.ok) {
                        setIsLoading(false)
                        setHttpError("Something went wrong")
                        return
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
                    setNewStepsAdded(false)
            } else if (teamToken === null) {
                navigate('/team')
                return
            }
            setIsLoading(false)
        }
        fetchTotalSteps().catch((err) => {
            setHttpError(err.message)
            setIsLoading(false)
        })

    }, [newStepsAdded, isLoggedIn, teamToken, navigate]);

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
            <AddStepsModal setNewStepsAdded={setNewStepsAdded} teamId={teamId}/>
        </div>
    )
}
