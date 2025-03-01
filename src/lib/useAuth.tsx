import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import * as cognito from './cognito/index';
import { UserDataInterface } from '../types';

interface AuthContext {
    user: UserDataInterface | null;
    signin: (email: string, password: string) => Promise<void | { error: string }>;
    signup: (
        email: string,
        password: string,
        username: string
    ) => Promise<void | { error: string }>;
    signout: () => void;
    isLoaded: boolean;
}

const authContext = createContext<AuthContext | undefined>(undefined);

export function ProvideAuth({ children }: { children: ReactNode }) {
    const auth = useProvideAuth(children);
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (context === undefined) {
        throw new Error('useAuth must be within AuthProvider');
    }
    return context;
};

function useProvideAuth(children: React.ReactNode) {
    const [user, setUser] = useState<UserDataInterface | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const initUser = async () => {
            const user = await cognito.getUser();
            if (!user) {
                signout();
            } else {
                setUser(user);
            }
        };
        initUser();
    }, [children]);

    const signin = async (email: string, password: string) => {
        try {
            await cognito.login({ email, password });
            const user = await cognito.getUser();
            setUser(user);
        } catch (error) {
            return { error: 'Invalid username or password' };
        }
    };
    const signup = async (email: string, password: string, username: string) => {
        try {
            await cognito.signup({ email, password, username });
            const user = await cognito.getUser();
            setUser(user);
        } catch (error) {
            return { error: 'Error signing up, try again later' };
        }
    };
    const signout = () => {
        cognito.logout();
        setUser(null);
    };

    return {
        user,
        isLoaded,
        signin,
        signup,
        signout,
    };
}
