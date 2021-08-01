import React, { SetStateAction, useState } from 'react';
import { useAuth } from '../lib/context/useAuth';
import { Layout } from '../components/common/Layout';
import { LoginForm } from '../components/form/LoginForm';
import { SignupForm } from '../components/form/SignupForm';
import { Button } from '../components/common/Button';

type ActiveButton = 'signup' | 'login' | null;

const IndexPage = () => {
    const auth = useAuth();
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);
    const user = auth.user;
    return (
        <Layout>
            <div className="container mx-auto relative min-h-screen">
                <div className="absolute top-1/4 w-full">
                    <div className="flex flex-col mx-auto w-max place-items-center">
                        {user ? (
                            <AuthenticatedSection username={user.username} />
                        ) : (
                            <UnauthenticatedSection {...{ activeButton, setActiveButton }} />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

interface AuthenticatedSection {
    username: string;
}

const AuthenticatedSection = ({ username }: AuthenticatedSection) => {
    return (
        <>
            <div className="text-3xl mb-4">Welcome {username}</div>
            <div className="mb-8">
                <Button title="Play" width={40}/>
            </div>
        </>
    );
};

interface UnauthenticatedSection {
    activeButton: string;
    setActiveButton: React.Dispatch<React.SetStateAction<ActiveButton>>;
}

const UnauthenticatedSection = ({ activeButton, setActiveButton }: UnauthenticatedSection) => {
    return (
        <>
            <div className="mb-8">
                <Button title="Signup" onClick={() => setActiveButton('signup')} />
                <Button title="Login" onClick={() => setActiveButton('login')} />
            </div>
            <div>{activeButton === null && <Button title="Play as guest" />}</div>
            {activeButton === 'signup' && <SignupForm handleClose={() => setActiveButton(null)} />}
            {activeButton === 'login' && <LoginForm handleClose={() => setActiveButton(null)} />}
        </>
    );
};

export default IndexPage;
