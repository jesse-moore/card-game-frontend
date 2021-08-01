import React from 'react';
import { NarBar } from './NarBar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative flex flex-col min-h-screen bg-blueGray-300">
            <NarBar />
            <div className="flex-grow">{children}</div>
        </div>
    );
};
