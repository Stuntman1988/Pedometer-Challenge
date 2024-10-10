import {Progressbar} from "./Components/Progressbar.tsx";
import {useEffect, useState} from "react";
import {TotalStepsOfUsers} from "../../models/TotalStepsOfUsers.ts";
import {SpinnerLoading} from "../Utils/SpinnerLoading.tsx";
import {useTranslation} from "react-i18next";
import {AddStepsModal} from "./Components/AddStepsModal.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {Team} from "../../models/Team.ts";


export const Scoreboard = () => {

    const {t} = useTranslation();
    const {isLoggedIn} = useAuth()
    const navigate = useNavigate();
    const [httpError, setHttpError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [totalStepsOfUser, setTotalStepsOfUser] = useState<TotalStepsOfUsers[]>([])
    const [newStepsAdded, setNewStepsAdded] = useState(false)
    const [teamToken] = useState<string | null>(localStorage.getItem("teamToken"));
    const [teamId, setTeamId] = useState('')
    const [team, setTeam] = useState<Team>()

    const [diffInDays, setDiffInDays] = useState(0)
    const [diffInWeeks, setDiffInWeeks] = useState(0)
    const [daysOrWeeks, setDaysOrWeeks] = useState(false)


    useEffect(() => {
        const fetchTotalSteps = async () => {
            if (isLoggedIn && teamToken) {
                const url = `${import.meta.env.VITE_BACKEND_URL}/stepsHistory/totalStepsOfUsers?teamId=${teamToken}`
                setTeamId(teamToken)
                const fetchTotalStepsResponse = await fetch(url)

                if (!fetchTotalStepsResponse.ok) {
                    setIsLoading(false)
                    setHttpError(`${t('error')}`)
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

                setTotalStepsOfUser(tempList)
                setNewStepsAdded(false)
            } else if (teamToken === null) {
                navigate('/team')
                return
            }
            await getTeam()
            setIsLoading(false)
        }
        fetchTotalSteps().catch((err) => {
            setHttpError(err.message)
            setIsLoading(false)
        })

    }, [newStepsAdded, isLoggedIn, teamToken, navigate]);

    const getTeam = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/teams/search/findTeamById?teamId=${teamToken}`
        const fetchTeam = await fetch(url)

        if (!fetchTeam.ok) {
            setHttpError(`${t('error')}`)
            return
        }

        const fetchTeamJson = await fetchTeam.json()

        setTeam(new Team(fetchTeamJson.id, fetchTeamJson.stepsGoal, fetchTeamJson.createdAt))

        const diffInMilliseconds = new Date().getTime() - new Date(fetchTeamJson.createdAt).getTime()
        const diffInDays = Math.round(diffInMilliseconds / (24 * 60 * 60 * 1000))
        const diffInWeeks = Math.floor(diffInDays / 7)
        setDiffInDays(diffInDays)
        setDiffInWeeks(diffInWeeks)
    }

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
            <div className={'row mt-4'}>
                <h5 className={'col text-start'}>Team ID: {team?.id}</h5>

                <button className={'btn col-2 btn-dark text-dark-emphasis'}
                        onClick={() => setDaysOrWeeks(!daysOrWeeks)}>
                    <span className={'h5'}>
                        {daysOrWeeks ?
                            `${t('Days')}: ${diffInDays}`
                            :
                            `${t('Week')}: ${diffInWeeks}`
                        }
                    </span>
                </button>

                <h5 className={'col text-end'}>{t('stepGoal')}: {team?.stepsGoal.toLocaleString('sv-SE') ?? 0}</h5>
            </div>
            {totalStepsOfUser.map((t, index) => (
                <Progressbar data={t} team={team} key={index}/>
            ))}
            <div className={'mt-4'}>
                <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal"
                        data-bs-target="#addStepsModal">
                    {t('addSteps')}
                </button>
            </div>
            {teamId && <AddStepsModal setNewStepsAdded={setNewStepsAdded} teamId={teamId}/>}
        </div>
    )
}
