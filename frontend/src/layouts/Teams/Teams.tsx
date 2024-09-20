import {useEffect, useState} from 'react';
import {useAuth} from '../../auth/AuthContext.tsx';
import {SpinnerLoading} from '../Utils/SpinnerLoading.tsx';
import {User} from '../../models/User.ts';
import {AddToTeamRequest} from "../../models/AddToTeamRequest.ts";
import {useNavigate} from "react-router-dom";

export const Teams = () => {

    const {isLoggedIn} = useAuth()
    const [httpError, setHttpError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [addToTeamError, setAddToTeamError] = useState('')
    const [user, setUser] = useState<User>()
    const [teamsId, setTeamsId] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            if (isLoggedIn) {
                const savedUserEmail = localStorage.getItem('userToken');
                const url = `http://localhost:8080/api/users/search/findUserByEmail?email=${savedUserEmail}`
                const response = await fetch(url)

                if (!response.ok) {
                    setHttpError('Something went wrong!')
                    return
                }

                const responseJson = await response.json()
                setUser(new User(responseJson.id, responseJson.name, responseJson.email, responseJson.teams?.id))
                setIsLoading(false)
            }
        }
        fetchUser().catch((error) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [isLoggedIn]);

    const addMeToTeam = async () => {
        const addToTeamRequest = new AddToTeamRequest(user?.id, Number(teamsId))
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

        localStorage.setItem('teamToken', teamsId)
        setAddToTeamError('')
        setTeamsId('')
        navigate('/scoreboard')
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
        <div className={'container d-flex justify-content-center mt-4'}>
            <div className={'card'}>
                <div className={'card-header text-center'}>
                    <div className={'card-title fs-5'}>{user?.name.substring(0, user?.name.indexOf(' '))}, are you not a
                        member of a team yet?
                    </div>
                    <h6 className={'card-subtitle mb-2 text-body-secondary'}>Put in a teams id and start walking.</h6> {/*TODO: översätt */}
                </div>
                <div className={'card-body text-center'}>
                    <form className={'row justify-content-center align-items-center'}>
                        <div className={'col-4 text-end'}>
                            <label htmlFor={'teamIdInput'} className={'form-label'}>Team ID</label>
                        </div>
                        <div className={'col-4'}>
                            <input type={'number'} className={'form-control'} id={'teamIdInput'} value={teamsId}
                                   onChange={e => setTeamsId(e.target.value)}/>
                        </div>
                        <div className={'col-4 text-start'}>
                            <button type={'button'} className={'btn btn-success'} onClick={addMeToTeam}
                                    disabled={teamsId === ''}>Add me!
                            </button>
                        </div>
                    </form>
                    {addToTeamError !== '' &&
                        <p className={'text-danger'}>{addToTeamError}</p>
                    }
                </div>
            </div>
        </div>
    )
}
