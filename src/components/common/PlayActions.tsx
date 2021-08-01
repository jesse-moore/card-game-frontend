import React from 'react';

export const PlayActions = () => {
    return (
        <div className="flex flex-row justify-center text-xl my-4">
            <button className="rounded bg-red-700 hover:bg-red-800 text-white h-16 w-24 shadow-md mx-4 active:bg-red-900 active:shadow-inner focus:outline-none z-20">
                Stand
            </button>
            <button className="rounded bg-lightBlue-600 hover:bg-lightBlue-700 text-white h-16 w-24 shadow-md mx-4 active:bg-lightBlue-800 active:shadow-inner focus:outline-none z-20">
                Hit
            </button>
        </div>
    );
};
