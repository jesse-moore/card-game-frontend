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
            <div className="bg-blueGray-300 min-h-screen flex flex-col" id="top">
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
                    <div className="mt-8 flex flex-col place-items-center text-left">
                        <div className="w-full" style={{ maxWidth: '700px' }}>
                            <a href="#applicationDetails">
                                <button className="w-40 cursor-pointer px-2 py-2 bg-white hover:shadow-md border-2 border-transparent hover:border-lightBlue-700 focus:outline-none active:shadow-inner rounded">
                                    Application Details
                                </button>
                            </a>
                        </div>
                        <h2 className="text-3xl mb-4">How to play</h2>
                        <ExplainerSection title="The Deck">
                            This game uses a standard 52 card deck which is reshuffled when 75% of
                            the cards have been dealt. Number cards have a value corresponding to
                            its number. Face cards have a value of 10 and an ace has a value of
                            either 1 or 11.
                        </ExplainerSection>
                        <ExplainerSection title="The Game">
                            The object of the game is to get a card count as close to 21 without
                            going over.
                        </ExplainerSection>
                        <ExplainerSection
                            imageSrc="https://cdn10t9c8mk6fd86gh2u8.s3.amazonaws.com/screen_initial_bet.png"
                            title="Place your bet"
                        >
                            The game will prompt you to place a bet before starting the round.
                        </ExplainerSection>

                        <ExplainerSection
                            imageSrc="https://cdn10t9c8mk6fd86gh2u8.s3.amazonaws.com/screen_change_bet.gif"
                            title="Change your bet"
                        >
                            You can change your bet before starting each round.
                        </ExplainerSection>
                        <ExplainerSection
                            imageSrc="https://cdn10t9c8mk6fd86gh2u8.s3.amazonaws.com/screen_start_round.gif"
                            title="The Deal"
                        >
                            Once the bets are placed, click start round. The player will be dealt
                            two cards face up and the dealer will be dealt two cards, one face up
                            and the other face down.
                        </ExplainerSection>
                        <ExplainerSection title="Natural">
                            If either the dealer or player gets a 10 or face card with an ace, a
                            natural, the game ends with the winner being the person with the
                            natural. If the dealer and player both have naturals, the bet of that
                            player is a stand-off (a tie).
                        </ExplainerSection>
                        <ExplainerSection title="The player">
                            If neither dealer or player have naturals, the player gets to choose
                            whether to draw another card (Hit) or (Stand) not ask for another card.
                            If the player exceeds 21, (a bust), the game ends with player losing.
                        </ExplainerSection>
                        <ExplainerSection title="The dealer">
                            When the player has finish being dealt thier desired amount of cards,
                            the dealer beings to draw cards. The dealer stands if the total is 17 or
                            more. If the dealer has an ace, and counting it as 11 would bring the
                            total to 17 or more (but not over 21), the dealer must count the ace as
                            11 and stand. If the dealer goes over 21 or has less than the player, (a
                            bust), the player wins. Otherwise the dealer wins.
                        </ExplainerSection>
                    </div>
                    <div className="mb-8" id="applicationDetails" />
                    <div className="flex flex-col place-items-center text-left">
                        <div
                            className="grid grid-cols-6 w-full items-center"
                            style={{ maxWidth: '700px' }}
                        >
                            <div className="col-span-1">
                                <a href="#top">
                                    <button className="cursor-pointer px-4 py-2 bg-white hover:shadow-md border-2 border-transparent hover:border-lightBlue-700 focus:outline-none active:shadow-inner rounded">
                                        Top
                                    </button>
                                </a>
                            </div>
                            <h2 className="text-3xl my-4 text-center col-start-2 col-span-4 whitespace-nowrap">
                                Application Details
                            </h2>
                            <div className="col-start-5 col-span-1" />
                        </div>
                        <ExplainerSection title="Purpose">
                            This project was made for a hackathon hosted by{' '}
                            <a
                                className="text-blue-300"
                                href="https://mintbean.io/"
                                target="_blank"
                            >
                                Mintbean
                            </a>
                            .
                        </ExplainerSection>
                        <ExplainerSection title="Frontend">
                            <div className="flex flex-row place-items-center my-4">
                                <span className="mr-2">Technologies:</span>
                                <a
                                    className="mr-2"
                                    href="https://www.typescriptlang.org/"
                                    target="_blank"
                                >
                                    <img
                                        src="https://img.shields.io/badge/TypeScript-black?style=flat-square&amp;logo=typescript"
                                        alt="Typescript"
                                    ></img>
                                </a>
                                <a className="mr-2" href="https://nextjs.org/" target="_blank">
                                    <img
                                        src="https://img.shields.io/badge/NextJS-black?style=flat-square&amp;logo=next.js"
                                        alt="NextJS"
                                    />
                                </a>
                                <a className="mr-2" href="https://tailwindcss.com/" target="_blank">
                                    <img
                                        src="https://img.shields.io/badge/Tailwind%20CSS-black?style=flat-square&amp;logo=tailwindcss"
                                        alt="Tailwind Badge"
                                    />
                                </a>
                                <a className="mr-2" href="https://graphql.org/" target="_blank">
                                    <img
                                        src="https://img.shields.io/badge/GraphQL-black?style=flat-square&amp;logo=graphql"
                                        alt="GraphQL"
                                    />
                                </a>
                                <a className="mr-2" href="https://aws.amazon.com/" target="_blank">
                                    <img
                                        src="https://img.shields.io/badge/Amazon%20AWS-black?style=flat-square&amp;logo=amazonaws"
                                        alt="AWS"
                                    />
                                </a>
                            </div>
                            <div className="my-4">
                                Repository:{' '}
                                <a
                                    className="text-blue-300 font-semibold"
                                    href="https://github.com/jesse-moore/card-game-frontend"
                                    target="_blank"
                                >
                                    blackjack-frontend
                                </a>
                            </div>
                            <div className="mt-2">
                                The frontend is used to display the game and interact with the game
                                api where all the game logic is performed. It is hosted on an AWS
                                EC2 instance.
                            </div>
                        </ExplainerSection>
                        <ExplainerSection title="Backend">
                            <div className="flex flex-row place-items-center my-4">
                                <span className="mr-2">Technologies:</span>
                                <a
                                    className="mr-2"
                                    href="https://www.typescriptlang.org/"
                                    target="_blank"
                                >
                                    <img
                                        src="https://img.shields.io/badge/TypeScript-black?style=flat-square&amp;logo=typescript"
                                        alt="Typescript"
                                    ></img>
                                </a>
                                <a
                                    className="mr-2"
                                    href="https://www.apollographql.com/"
                                    target="_blank"
                                >
                                    <img
                                        src="https://img.shields.io/badge/Apollo%20GraphQL-black?style=flat-square&amp;logo=apollographql"
                                        alt="Apollo GraphQL"
                                    />
                                </a>
                                <a className="mr-2" href="https://www.mysql.com/" target="_blank">
                                    <img
                                        src="https://img.shields.io/badge/MySQL-eeeeee?style=flat-square&logo=mysql"
                                        alt="MySQL"
                                    />
                                </a>
                                <a className="mr-2" href="https://aws.amazon.com/" target="_blank">
                                    <img
                                        src="https://img.shields.io/badge/Amazon%20AWS-black?style=flat-square&amp;logo=amazonaws"
                                        alt="AWS"
                                    />
                                </a>
                            </div>
                            <div className="my-4">
                                Repository:{' '}
                                <a
                                    className="text-blue-300 font-semibold"
                                    href="https://github.com/jesse-moore/card-game-api"
                                    target="_blank"
                                >
                                    blackjack-api
                                </a>
                            </div>
                            <div className="mt-2">
                                The backend features a GraphQL api that authenticates users and
                                creates and manages game instances for each connected user. It will
                                keep track of the users cash balance and if they are authenticated,
                                store that balance in a MySQL database. Every 15 minutes the server
                                will remove any games that have been abandoned (not used in the last
                                30 minutes). It is hosted on an AWS EC2 instance.
                            </div>
                        </ExplainerSection>
                    </div>
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

interface ExplainerSection {
    imageSrc?: string;
    title?: string;
    children: React.ReactNode | string;
}

const ExplainerSection = ({ imageSrc, children, title }: ExplainerSection) => {
    return (
        <div
            className="relative bg-blueGray-700 p-4 my-4 rounded-md shadow-md w-full"
            style={{ maxWidth: '700px' }}
        >
            {title && (
                <h3 className="text-left font-semibold text-lg sm:text-2xl text-white">{title}</h3>
            )}
            <div className="mb-2 font-semibold text-gray-300 text-base sm:text-xl">{children}</div>
            {imageSrc && <img src={imageSrc} />}
        </div>
    );
};

export default IndexPage;
