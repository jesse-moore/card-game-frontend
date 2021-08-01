import React, { MouseEventHandler, ReactNode } from 'react';
import { CloseIcon } from './CloseIcon';

export interface CloseButton {
    onClick?: MouseEventHandler;
}
export const CloseButton = ({ onClick }: CloseButton) => {
    return (
        <button
            className={`px-2 py-2 hover:bg-white hover:shadow-md border-2 border-transparent hover:border-lightBlue-700 focus:outline-none active:shadow-inner rounded`}
            onClick={onClick}
        >
            <CloseIcon />
        </button>
    );
};
