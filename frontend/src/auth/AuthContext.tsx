import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {User} from "../models/User.ts";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: User) => void;
    logout: () => void;
    checkIfAdmin: () => Promise<boolean>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('userToken');
        if (savedUser) {
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, []);

    const login = (token: User) => {
        localStorage.setItem('userToken', token.email);
        if (token.teamsId !== undefined) {
            localStorage.setItem('teamToken', token.teamsId.toString());
        }
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('teamToken');
        setIsLoggedIn(false);
    };

    const checkIfAdmin = async (): Promise<boolean> => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            return false;
        }
        const url = `http://localhost:8080/api/users/search/checkIfUserIsAdmin/`
        const headersOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': token
            }
        }
        const response = await fetch(url, headersOptions);

        if (!response.ok) {
            return false
        }
        return await response.json()
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, checkIfAdmin, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


/*import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Definiera typer för AuthContext
interface AuthContextType {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

// Skapa en AuthContext med standardvärden
export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {}
});

// AuthProvider komponent för att hantera global autentiseringstillstånd
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};*/
