import {useEffect, useState} from 'react';
import {User} from '../../models/User.ts';
import {useAuth} from '../../auth/AuthContext.tsx';
import {SpinnerLoading} from "../Utils/SpinnerLoading.tsx";
import {StepsHistory} from "../../models/StepsHistory.ts";
import {StepsHistoryComp} from "./Components/StepsHistoryComp.tsx";
import {PersonalInfo} from "./Components/PersonalInfo.tsx";
import {useTranslation} from "react-i18next";

export const MyPage = () => {

    const {t} = useTranslation();
    const {isLoggedIn} = useAuth()
    const [httpError, setHttpError] = useState('')
    const [httpStepsHistoryError, setHttpStepsHistoryError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isStepsHistoryLoading, setIsStepsHistoryLoading] = useState(true)
    const [user, setUser] = useState<User>()
    const [haveTeamId, setHaveTeamId] = useState(false)
    const [stepsHistoryOfUser, setStepsHistoryOfUser] = useState<StepsHistory[]>([])
    const [totalSteps, setTotalSteps] = useState(0)
    const [newStepsAdded, setNewStepsAdded] = useState(false)


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

            setUser(loggedInUser)
            setIsLoading(false)

        }
        fetchUserInfo().catch((error) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [newStepsAdded, haveTeamId, isLoggedIn]);

    useEffect(() => {
        if (user) {
            fetchStepsHistory()
        }
    }, [user]);

    const fetchStepsHistory = async () => {
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
        let totalStepsTemp = 0
        for (const key in stepsHistoryResponseJsonData) {
            stepsHistoryOfUserTemp.push({
                id: stepsHistoryResponseJsonData[key].id,
                steps: stepsHistoryResponseJsonData[key].steps,
                createdAt: stepsHistoryResponseJsonData[key].createdAt
            })
            totalStepsTemp += stepsHistoryResponseJsonData[key].steps
        }
        setTotalSteps(totalStepsTemp)
        setIsStepsHistoryLoading(false)
        setNewStepsAdded(false)
        setStepsHistoryOfUser(stepsHistoryOfUserTemp)

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
            <div className={'row align-items-start'}>
                <div className={'col-12 col-md-7 mb-3 mx-auto card'}>
                    <h5 className={'card-header'}>{t('Stephistory')}</h5>
                    <div className={'card-body'}>

                        {isStepsHistoryLoading || user == undefined ?
                            <SpinnerLoading/>
                            :
                            <>
                                {httpStepsHistoryError ?
                                    <p className={'card-text'}>{httpStepsHistoryError}</p>
                                    :
                                    <>
                                        <div className={'row'}>
                                            <h5 className={'card-title col-4'}>{t('NumberOfSteps')}</h5>
                                            <h5 className={'card-title col-6'}>{t('DateAdded')}</h5>
                                        </div>
                                        <StepsHistoryComp user={user}
                                                          stepsHistoryOfUser={stepsHistoryOfUser}
                                                          totalSteps={totalSteps}
                                                          setNewStepsAdded={setNewStepsAdded}/>
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>

                {user !== undefined &&
                    <PersonalInfo user={user} setNewStepsAdded={setNewStepsAdded}/>
                }
            </div>
        </div>
    )
}
