import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {User} from "../../models/User.ts";
import {useNavigate} from "react-router-dom";


export const RegisterUser = () => {

    const {t} = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isValid, setIsValid] = useState(false)

    const navigate = useNavigate()

    const ValidateRegister = () => {
        let isNameValid = false
        let isEmailValid = false
        let isPasswordValid = false
        const emailPattern = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}/;

        if (!name) {
            setNameError('Can not be empty!')
        } else {
            setNameError('')
            isNameValid = true
        }

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
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters')
        } else {
            setPasswordError('')
            isPasswordValid = true
        }

        if (isNameValid && isEmailValid && isPasswordValid) {
            setIsValid(true)
        }
    }

    useEffect(() => {
        if (!isValid) {
            return
        }
        const submitRegister = async () => {
            const newUser = new User(0, name, email, 0, password)
            const urlFetchUser = `${import.meta.env.VITE_BACKEND_URL}/users/registerUser`
            const headers = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }
            const fetchUserResponse = await fetch(urlFetchUser, headers)
            if (!fetchUserResponse.ok) {
                setEmailError('Email already registered!')
                setIsValid(false)
                return
            }

            navigate('/login')
            setIsValid(false)
        }
        submitRegister().catch((error) => {
            console.log('Register user: ' + error)
        })
    }, [isValid]);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        ValidateRegister()
    }

    return (
        <div className={'container d-flex justify-content-center mt-5'}>
            <div className={'border rounded d-inline-block p-5 shadow'} style={{maxWidth: '350px', width: '100%'}}>
                <form onSubmit={handleSubmit} noValidate>

                    <h4 className={'form-label mb-3 text-center'}>{t('Register')}</h4>

                    <div className={'form-outline mb-4'}>
                        <label className={'form-label'} htmlFor={'name'}>{t('Name')}</label>
                        <input type={'text'} id={'name'} className={'form-control'}
                               onChange={e => setName(e.target.value)}/>
                        {nameError && <p className={'form-text text-danger'}>{emailError}</p>}
                    </div>

                    <div className={'form-outline mb-4'}>
                        <label className={'form-label'} htmlFor={'email'}>{t('Email')}</label>
                        <input type={'email'} id={'email'} className={`form-control ${emailError ? 'is-invalid' : ''}`}
                               onChange={e => setEmail(e.target.value)}/>
                        {emailError && <p className={'form-text text-danger'}>{emailError}</p>}
                    </div>

                    <div className={'form-outline mb-4'}>
                        <label className={'form-label'} htmlFor={'password'}>{t('Password')}</label>
                        <input type={'password'} id={'password'}
                               className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                               onChange={e => setPassword(e.target.value)}/>
                        {passwordError && <p className={'form-text text-danger'}>{passwordError}</p>}
                    </div>

                    <button type={'submit'} className={'btn btn-primary mt-2'}>{t('Register')}</button>

                </form>
            </div>
        </div>
    )
}
