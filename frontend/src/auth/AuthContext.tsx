import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {User} from "../models/User.ts"
import {AlertModal} from "../layouts/Utils/AlertModal.ts";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

interface AuthContextType {
    isLoggedIn: boolean
    login: (token: User) => void
    logout: () => void
    // checkIfAdmin: () => Promise<boolean>
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const {t} = useTranslation()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        const savedUser = localStorage.getItem('userToken')
        const expDate = localStorage.getItem('expDate')

        if (expDate) {
            const dateNow = new Date()
            if (dateNow >= new Date(expDate)) {
                AlertModal.showSessionExpired(`${t('SessionExpired')}`, `${t('YouLogOut')}`)
                logout()
                navigate('/login')
                return
            }
        }

        if (savedUser) {
            setIsLoggedIn(true)
        }
        setLoading(false)
    }, [])

    const login = (token: User) => {
        localStorage.setItem('userToken', token.email)
        localStorage.setItem('expDate', (new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)).toISOString()) //Inlogg går ut efter 5dagar
        if (token.teamId !== undefined) {
            localStorage.setItem('teamToken', token.teamId.toString())
        }
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem('userToken')
        localStorage.removeItem('teamToken')
        localStorage.removeItem('expDate')
        setIsLoggedIn(false)
    }

    // const checkIfAdmin = async (): Promise<boolean> => {
    //     const token = localStorage.getItem('userToken')
    //     if (!token) {
    //         return false
    //     }
    //     const url = `${import.meta.env.VITE_BACKEND_URL}/users/search/checkIfUserIsAdmin/`
    //     const headersOptions = {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authToken': token
    //         }
    //     }
    //     const response = await fetch(url, headersOptions)
    //
    //     if (!response.ok) {
    //         return false
    //     }
    //     return await response.json()
    // }

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}