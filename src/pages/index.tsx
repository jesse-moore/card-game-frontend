import React, { useState } from 'react';
import { useAuth } from '../lib/useAuth';
import { Layout } from '../components/common/Layout';
import { LoginForm } from '../components/form/LoginForm';
import { SignupForm } from '../components/form/SignupForm';
import { Button } from '../components/common/Button';
import Link from 'next/link';
import { Card } from '../components/game/Card';
import { LinkedInIcon } from '../components/common/LinkedInIcon';
import { GithubIcon } from '../components/common/GithubIcon';
import { GmailIcon } from '../components/common/GmailIcon';

type ActiveButton = 'signup' | 'login' | 'guest' | null;

const IndexPage = () => {
    const auth = useAuth();
    const [activeButton, setActiveButton] = useState<ActiveButton>(null);
    const user = auth.user;

    return (
        <Layout>
            <div className="bg-blueGray-300 min-h-screen flex flex-col">
                <div className="container mx-auto relative bg-blueGray-300">
                    <div className="mt-16 text-center text-5xl opacity-80 font-semibold tracking-widest text-blueGray-500">
                        <h1>Blackjack</h1>
                    </div>
                    <div className="w-min mx-auto mt-4">
                        <div className="-ml-36 h-52">
                            <Card suit="heart" faceCard="king" number={10} size="sm" />
                            <Card
                                suit="spade"
                                faceCard="ace"
                                number={11}
                                size="sm"
                                translateX={30}
                            />
                            <Card suit="club" number={7} size="sm" translateX={150} />
                            <Card suit="diamond" number={4} size="sm" translateX={180} />
                        </div>
                    </div>
                    <div className="flex flex-col mx-auto w-max place-items-center">
                        {user ? (
                            <AuthenticatedSection username={user.username} />
                        ) : (
                            <UnauthenticatedSection {...{ activeButton, setActiveButton }} />
                        )}
                    </div>
                    {/* <div className="mt-8 text-center text-3xl">
                        <h2>How to play</h2>
                    </div> */}
                </div>
                <div className="mt-auto bg-blueGray-400">
                    <div className="w-max m-auto py-2">
                        <div className="pb-2 text-center text-2xl">Jesse Moore</div>
                        <div className="grid grid-cols-3 gap-x-8 w-max mx-auto">
                            <a
                                href="https://www.linkedin.com/in/jesse-moore-00804030/"
                                target="_blank"
                            >
                                <LinkedInIcon width={36} />
                            </a>
                            <a href="https://github.com/jesse-moore" target="_blank">
                                <GithubIcon width={36} />
                            </a>
                            <a href="mailto:moore.jesse@gmail.com">
                                <GmailIcon width={36} />
                            </a>
                        </div>
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
