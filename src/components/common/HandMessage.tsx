import React from 'react';

export const HandMessage = ({ state }: { state: number }) => {
    const messageTable = { 2: 'Natural', 3: 'Black Jack', 4: 'Bust' };
    return (
        <div
            className="absolute top-16 xsm:top-24 left-1/2 z-50 bg-lightBlue-700 text-white px-8 py-3 rounded shadow-md"
            style={{ transform: 'translate(-50%, -50%)', minWidth: '250px' }}
        >
            <div className="xsm:text-3xl text-lg">
                <div className="flex flex-row flex-nowrap whitespace-nowrap justify-center">
                    <div>{messageTable[state]}</div>
                </div>
            </div>
        </div>
    );
};
