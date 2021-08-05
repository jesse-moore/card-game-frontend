import React, { useState } from 'react';
import Head from 'next/head';
import { GameSettingsModal } from './GameSettingsModal';
import { NavBar } from './NarBar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [gameSettings, setGameSettings] = useState(false);
    return (
        <div className="relative flex flex-col min-h-screen">
            <Head>
                <title>Blackjack</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                {/* <!-- Primary Meta Tags --> */}
                <meta name="title" content="Blackjack" />
                <meta name="description" content="A single page, responsive blackjack game." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://blackjack.jesse-moore.com" />
                <meta property="og:title" content="Blackjack" />
                <meta
                    property="og:description"
                    content="A single page, responsive blackjack game."
                />
                <meta
                    property="og:image"
                    content="https://cdn10t9c8mk6fd86gh2u8.s3.amazonaws.com/blackjack_screen.png"
                />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://blackjack.jesse-moore.com" />
                <meta property="twitter:title" content="Blackjack" />
                <meta
                    property="twitter:description"
                    content="A single page, responsive blackjack game."
                />
                <meta
                    property="twitter:image"
                    content="https://cdn10t9c8mk6fd86gh2u8.s3.amazonaws.com/blackjack_screen.png"
                />
            </Head>
            <NavBar handleGameSettings={() => setGameSettings(true)} />
            {children}
            {gameSettings && <GameSettingsModal handleClose={() => setGameSettings(false)} />}
        </div>
    );
};
