import React, { useState } from 'react';
import { MouseEventHandler } from 'react';
import { ChangeBetButton } from './ChangeBetButton';
export interface BetStatusBox {
    disablePlaceBet?: boolean;
    bet: string;
    total: string;
    onClick: MouseEventHandler;
}
export const BetStatusBox = ({ bet, disablePlaceBet, total, onClick }: BetStatusBox) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex flex-row lg:flex-col whitespace-nowrap w-min lg:w-36 border-2 border-white rounded-lg text-center font-semibold text-sm xsm:text-lg text-white px-3 py-2 xsm:px-6 xsm:py-3 mx-auto place-items-center relative">
                <div>
                    Total Bet<span className="lg:hidden mr-1">:</span>
                </div>
                <div>{`$${bet}.00`}</div>
                <div className="lg:border-b lg:border-white my-4 w-full mr-4 lg:mr-0" />
                <div>
                    Total Cash<span className="lg:hidden mr-1">:</span>
                </div>
                <div>{`$${total}.00`}</div>
            </div>
            {hover && !disablePlaceBet && <ChangeBetButton onClick={onClick} />}
        </div>
    );
};
