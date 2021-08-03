import React, { useState } from 'react';
import { GameSettingsModal } from './GameSettingsModal';
import { NavBar } from './NarBar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [gameSettings, setGameSettings] = useState(false);
    return (
        <div className="relative flex flex-col min-h-screen">
            <NavBar handleGameSettings={() => setGameSettings(true)} />
            {children}
            {gameSettings && <GameSettingsModal handleClose={() => setGameSettings(false)} />}
        </div>
    );
};
