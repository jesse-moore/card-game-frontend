import Link from 'next/link';
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import { useComponentFocused } from '../../lib/useComponentFocused';
import { HomeIcon } from './HomeIcon';
import { SettingsIcon } from './SettingsIcon';
import { useAuth } from '../../lib/useAuth';

interface NavBar {
    handleGameSettings: MouseEventHandler;
}

export const NavBar = ({ handleGameSettings }: NavBar) => {
    const auth = useAuth();
    const [settingsMenu, setSettingsMenu] = useState<boolean>(false);

    const handleLogout = () => {
        auth.signout();
        setSettingsMenu(false);
    };

    return (
        <div className="w-full py-1 px-4 flex flex-row items-center bg-white fixed top-0 z-20">
            <div className="container mx-auto flex flex-row relative">
                <Link href="/">
                    <button className="mr-auto text-xl px-4 py-2 hover:shadow-md border-2 border-white hover:border-lightBlue-700 focus:outline-none active:shadow-inner rounded">
                        <HomeIcon />
                    </button>
                </Link>
                <button
                    className="text-xl px-4 py-2 hover:shadow-md border-2 border-white hover:border-lightBlue-700 focus:outline-none active:shadow-inner rounded"
                    onClick={() => setSettingsMenu(true)}
                >
                    <SettingsIcon />
                </button>
                {settingsMenu && (
                    <SettingsMenu
                        handleClose={setSettingsMenu}
                        handleLogout={handleLogout}
                        handleGameSettings={handleGameSettings}
                    />
                )}
            </div>
        </div>
    );
};

interface SettingsMenu {
    handleClose: Dispatch<SetStateAction<boolean>>;
    handleLogout: MouseEventHandler;
    handleGameSettings: MouseEventHandler;
}

const SettingsMenu = ({ handleClose, handleLogout, handleGameSettings }: SettingsMenu) => {
    const auth = useAuth();
    const { ref, isComponentFocused } = useComponentFocused(true);
    useEffect(() => {
        if (!isComponentFocused) handleClose(false);
    }, [isComponentFocused]);
    return (
        <div
            className="absolute bg-white w-48 right-0 top-12 flex flex-col place-items-center"
            ref={ref}
        >
            <button
                className="w-full py-2 border-2 border-white hover:border-lightBlue-700 focus:outline-none"
                onClick={handleGameSettings}
            >
                Game Settings
            </button>
            {auth.user && (
                <button
                    className="w-full py-2 border-2 border-white hover:border-lightBlue-700 focus:outline-none"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </div>
    );
};
