import React, { MouseEventHandler, ReactNode } from 'react';

export interface Button {
    title?: React.ReactNode;
    onClick?: MouseEventHandler;
    children?: ReactNode;
    width?: number | 'auto';
}
export const Button = ({ children, title, width = 'auto', onClick }: Button) => {
    return (
        <button
            className={`w-${width} mx-4 text-xl cursor-pointer px-2 py-2 bg-white hover:shadow-md border-2 border-transparent hover:border-lightBlue-700 focus:outline-none active:shadow-inner rounded`}
            onClick={onClick}
        >
            {title}
            {children}
        </button>
    );
};
