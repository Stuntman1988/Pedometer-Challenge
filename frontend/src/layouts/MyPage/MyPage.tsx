import {useEffect, useState} from 'react';
import {User} from '../../models/User.ts';
import {useAuth} from '../../auth/AuthContext.tsx';
import {SpinnerLoading} from "../Utils/SpinnerLoading.tsx";
import {StepsHistory} from "../../models/StepsHistory.ts";

export const MyPage = () => {

    const {isLoggedIn} = useAuth()
    const [httpError, setHttpError] = useState('')
    const [httpStepsHistoryError, setHttpStepsHistoryError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isStepsHistoryLoading, setIsStepsHistoryLoading] = useState(true)
    const [user, setUser] = useState<User>()
    const [haveTeamId, setHaveTeamId] = useState(false)
    const [stepsHistoryOfUser, setStepsHistoryOfUser] = useState<StepsHistory[]>([])


    useEffect(() => {
        const fetchUserInfo = async () => {
            const savedUserEmail = localStorage.getItem('userToken');
            const url = `${import.meta.env.VITE_BACKEND_URL}/users/search/findUserByEmail?email=${savedUserEmail}`
            const userResponse = await fetch(url)

            if (!userResponse.ok) {
                setIsLoading(false)
                setHttpError('Something went wrong!')
                return
            }

            const userResponseJson = await userResponse.json()
            const loggedInUser = new User(userResponseJson.id, userResponseJson.name, userResponseJson.email)
            const teamUrl = userResponseJson._links.team.href
            const fetchTeam = await fetch(teamUrl)
            if (fetchTeam.ok) {
                const fetchTeamJson = await fetchTeam.json()
                loggedInUser.teamId = fetchTeamJson.id
                setHaveTeamId(true)
            }

            setIsLoading(false)
            setUser(loggedInUser)
            await fetchStepsHistory()


        }
        fetchUserInfo().catch((error) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [haveTeamId, isLoggedIn]);


    const fetchStepsHistory = async () => {
        if (!user) {
            return
        }
        const url = `${import.meta.env.VITE_BACKEND_URL}/stepsHistories/search/findStepsHistoriesByUserId?userId=${user?.id}`
        const stepsHistoryResponse = await fetch(url)

        if (!stepsHistoryResponse.ok) {
            setIsStepsHistoryLoading(false)
            setHttpStepsHistoryError('Something went wrong with stepsHistory!')
            return
        }

        const stepsHistoryResponseJson = await stepsHistoryResponse.json()
        const stepsHistoryResponseJsonData = stepsHistoryResponseJson._embedded.stepsHistories

        const stepsHistoryOfUserTemp: StepsHistory[] = []
        for (const key in stepsHistoryResponseJsonData) {
            stepsHistoryOfUserTemp.push({
                id: stepsHistoryResponseJsonData[key].id,
                steps: stepsHistoryResponseJsonData[key].steps,
                createdAt: stepsHistoryResponseJsonData[key].createdAt
            })
        }
        setIsStepsHistoryLoading(false)
        setStepsHistoryOfUser(stepsHistoryOfUserTemp)
    }

    function parseDate(date: Date) {
        const newDate = new Date(date)
        return new Intl.DateTimeFormat("en-US", {dateStyle: "medium"}).format(newDate);
    }

    function parseTime(date: Date) {
        const newDate = new Date(date)
        return new Intl.DateTimeFormat("en-US", {timeStyle: "short", hour12: false}).format(newDate);
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
        <div className={'container mt-4'}>
            <div className={'row justify-content-between'}>
                <div className={'col-10 col-md-6 mb-3 mx-auto card'}>
                    <h5 className={'card-header'}>Steghistorik</h5>
                    <div className={'card-body'}>
                        <h5 className={'card-title'}>Special title treatment</h5>
                        {isStepsHistoryLoading ?
                            <SpinnerLoading/>
                            :
                            <>
                                {httpStepsHistoryError ?
                                    <p className={'card-text'}>{httpStepsHistoryError}</p>
                                    :
                                    <>
                                        {
                                            stepsHistoryOfUser.map(sh => (
                                                <li className='border' key={sh.id} style={{listStyle: "none"}}>
                                                    <div className='row p-1'>
                                                        <p className='col-7 mb-0'>{sh.steps} steg</p>
                                                        <p className='col-5 mb-0'>{parseDate(sh.createdAt)} - {parseTime(sh.createdAt)}</p>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </>
                                }
                            </>
                        }

                        <a href={'#'} className={'btn btn-primary'}>Go somewhere</a>
                    </div>
                </div>


                <div className={'col-7 col-md-4 myPageMargin mb-3 card'}>
                    <h5 className={'card-header'}>Personlig information</h5>
                    <div className={'card-body'}>
                        <ul className={'list-unstyled fs-6'}>
                            <li className={''}>Namn: {user?.name}</li>
                            <li className={''}>Email: {user?.email}</li>
                            <li className={''}>ID: {user?.id}</li>
                            <li className={''}>TeamID: {user?.teamId}</li>
                        </ul>
                        <a href={'#'} className={'btn btn-primary'}>Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
