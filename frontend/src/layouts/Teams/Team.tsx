import {useEffect, useState} from 'react';
import {useAuth} from '../../auth/AuthContext.tsx';
import {SpinnerLoading} from '../Utils/SpinnerLoading.tsx';
import {User} from '../../models/User.ts';
import {AddToTeam} from "./Components/AddToTeam.tsx";
import {CreateNewTeam} from "./Components/CreateNewTeam.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";

export const Team = () => {

    const {isLoggedIn} = useAuth()
    const [httpError, setHttpError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User>()

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
                const teamUrl = responseJson._links.team.href
                const fetchTeam = await fetch(teamUrl)
                if (!fetchTeam.ok) {
                    setUser(new User(responseJson.id, responseJson.name, responseJson.email))
                } else {
                    const fetchTeamJson = await fetchTeam.json()
                    setUser(new User(responseJson.id, responseJson.name, responseJson.email, fetchTeamJson.id))
                }
                setIsLoading(false)
            }
        }
        fetchUser().catch((error) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [isLoggedIn]);


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
        <div className={'container mt-4'} style={{maxWidth: '500px'}}>
            {user &&
                <>
                    <div className={''}>
                        <AddToTeam user={user}/>
                    </div>
                    <p className={'text-center fs-4 mt-4'}>
                        or create a new team and invite your friends
                        <br/>
                        <FontAwesomeIcon icon={faArrowDown} className={'fs-2'}/>
                    </p>
                    <div className={''}>
                        <CreateNewTeam/>
                    </div>
                </>
            }

        </div>
    )
}
