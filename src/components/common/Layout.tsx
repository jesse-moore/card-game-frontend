import React from 'react';
import { NarBar } from './NarBar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative flex flex-col bg-blueGray-300 min-h-screen">
            <NarBar />
            {children}
        </div>
    );
};
