import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/useAuth';
import { useTestQuery, useCreateUserMutation } from '../graphql/queries';
import { Layout } from '../components/common/Layout';
import { LoginForm } from '../components/form/LoginForm';
import { SignupForm } from '../components/form/SignupForm';
import { Button } from '../components/common/Button';
import Link from 'next/link';
import { GuestForm } from '../components/form/GuestForm';

type ActiveButton = 'signup' | 'login' | 'guest' | null;

const IndexPage = () => {
    const auth = useAuth();
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);
    const user = auth.user;
    // const { data, error } = useTestQuery();

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
            <Link href="/play" passHref>
                <div>
                    <Button title="Play" width={40} />
                </div>
            </Link>
        </>
    );
};

interface UnauthenticatedSection {
    activeButton: string | null;
    setActiveButton: React.Dispatch<React.SetStateAction<ActiveButton | null>>;
}

const UnauthenticatedSection = ({ activeButton, setActiveButton }: UnauthenticatedSection) => {
    return (
        <>
            <div className="mb-8">
                <Button
                    title="Signup"
                    width={40}
                    active={activeButton === 'signup'}
                    onClick={() => setActiveButton('signup')}
                />
                <Button
                    title="Login"
                    width={40}
                    active={activeButton === 'login'}
                    onClick={() => setActiveButton('login')}
                />
            </div>
            {(activeButton === null || activeButton === 'guest') && (
                <div className="mb-8">
                    <Link href="/play" passHref>
                        <div>
                            <Button
                                title="Play as guest"
                                width={40}
                                active={activeButton === 'guest'}
                                onClick={() => setActiveButton('guest')}
                            />
                        </div>
                    </Link>
                </div>
            )}
            {activeButton === 'signup' && <SignupForm handleClose={() => setActiveButton(null)} />}
            {activeButton === 'login' && <LoginForm handleClose={() => setActiveButton(null)} />}
        </>
    );
};

export default IndexPage;
