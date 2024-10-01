import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../../auth/AuthContext.tsx";
import {User} from "../../models/User.ts";
import {useTranslation} from "react-i18next";


export const LoginPage = () => {

    const {t} = useTranslation()
    const {login} = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isValid, setIsValid] = useState(false)

    const navigate = useNavigate()

    const validateSignIn = () => {
        let isEmailValid = false
        let isPasswordValid = false
        const emailPattern = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}/;

        if (!email) {
            setEmailError('Can not be empty!')
        } else if (!emailPattern.test(email)) {
            setEmailError('Not a valid email')
        } else {
            setEmailError('')
            isEmailValid = true
        }

        if (!password) {
            setPasswordError('Can not be empty!')
        } else {
            setPasswordError('')
            isPasswordValid = true
        }

        if (isEmailValid && isPasswordValid) {
            setIsValid(true)
        }
    }

    useEffect(() => {
        if (!isValid) {
            return
        }
        const fetchUser = async () => {

            const urlFetchUser = `${import.meta.env.VITE_BACKEND_URL}/users/search/findUserByEmail?email=${email}`
            const fetchUserResponse = await fetch(urlFetchUser)
            if (!fetchUserResponse.ok) {
                setEmailError('Email not registered!')
                setIsValid(false)
                return
            }

            const urlVerifyPassword = `${import.meta.env.VITE_BACKEND_URL}/users/checkPassword`
            const headers = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'userPass': `${email}:${password}`,
                }
            }
            const verifyPasswordResponse = await fetch(urlVerifyPassword, headers)
            if (!verifyPasswordResponse.ok) {
                setPasswordError('Password incorrect!')
                setIsValid(false)
                return
            }

            const passwordIsOk = await verifyPasswordResponse.json()
            const fetchUserResponseJson = await fetchUserResponse.json()
            const teamUrl = fetchUserResponseJson._links.team?.href

            let teamId = undefined
            const fetchTeam = await fetch(teamUrl)
            if (fetchTeam.ok) {
                const fetchTeamJson = await fetchTeam.json()
                teamId = fetchTeamJson.id
            }

            if (passwordIsOk) {
                const newUser = new User(fetchUserResponseJson.id, fetchUserResponseJson.name, fetchUserResponseJson.email, teamId)
                login(newUser)
                navigate('/scoreboard')
            }
            setIsValid(false)
        }
        fetchUser().catch((error) => {
            console.log('Login: ', error)
        })
    }, [isValid])

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        validateSignIn()
    }

    return (
        <div className={'container d-flex justify-content-center mt-5'}>
            <div className={'border rounded d-inline-block p-5 shadow'} style={{maxWidth: '350px', width: '100%'}}>
                <form onSubmit={handleSubmit} noValidate>

                    <h4 className={'form-label mb-3 text-center'}>{t('signIn')}</h4>

                    <div className={'form-outline mb-4'}>
                        <label className={'form-label'} htmlFor={'email'}>{t('Email')}</label>
                        <input type={'email'} id={'email'} className={'form-control'}
                               onChange={e => setEmail(e.target.value)}/>
                        {emailError && <p className={'form-text text-danger'}>{emailError}</p>}
                    </div>

                    <div className={'form-outline mb-4'}>
                        <label className={'form-label'} htmlFor={'password'}>{t('Password')}</label>
                        <input type={'password'} id={'password'} className={'form-control'}
                               onChange={e => setPassword(e.target.value)}/>
                        {passwordError && <p className={'form-text text-danger'}>{passwordError}</p>}
                    </div>

                    <button type={'submit'} className={'btn btn-primary mb-4'}>{t('signIn')}</button>

                    <div className={'text-center'}>
                        <p>{t('NotAMember')} <a href={'/register'}>{t('Register')}</a></p>
                    </div>

                </form>
            </div>
        </div>
    )
}
