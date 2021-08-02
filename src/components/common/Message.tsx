import React from 'react';

interface Message {
    status: number;
    amount: number;
}

export const Message = ({ status, amount }: Message) => {
    const message = status === 1 ? 'You Lose' : status === 2 ? 'You Win' : 'Tie';
    const color = status === 1 ? 'red' : status === 2 ? 'green' : 'blue';
    const sign = status === 1 ? '-' : '+';
    return (
        <div
            className="absolute -top-6 xsm:top-0 left-1/2 z-50 bg-lightBlue-700 text-white px-8 py-3 rounded shadow-md"
            style={{ transform: 'translate(-50%, -50%)', minWidth: '250px' }}
        >
            <div className="xsm:text-3xl text-lg">
                <div className="flex flex-row flex-nowrap whitespace-nowrap justify-center">
                    <div>{message}</div>
                    <div className={`text-${color}-400 ml-2`}>
                        {status !== 3 && `${sign}$${amount}`}
                    </div>
                </div>
            </div>
        </div>
    );
};
