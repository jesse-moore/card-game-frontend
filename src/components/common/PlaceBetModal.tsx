import React, { FormEventHandler, useState } from 'react';
import { Modal } from './modal';

interface PlaceBetModal {
    maxBet?: number;
    minBet?: number;
    bet: string;
    onSubmit: (value: string) => void;
}

export const PlaceBetModal = ({
    maxBet = 100,
    minBet = 25,
    bet: currentBet,
    onSubmit,
}: PlaceBetModal) => {
    const [bet, setBet] = useState<string>(currentBet);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit(bet);
    };

    return (
        <Modal>
            <div>
                <form className="flex flex-col px-16 py-16" onSubmit={handleSubmit}>
                    <div className="relative w-36">
                        <div
                            className="absolute text-lg font-semibold top-1/2 ml-2"
                            style={{ transform: 'translateY(-50%)' }}
                        >
                            $
                        </div>
                        <input
                            className="pl-5 pr-2 py-1 rounded text-lg font-semibold w-36"
                            id="bet"
                            name="place bet"
                            type="number"
                            step={5}
                            max={maxBet}
                            min={minBet}
                            value={bet}
                            onChange={({ target }) => setBet(target.value)}
                        />
                    </div>
                    <button
                        className="mt-3 py-2 bg-green-500 rounded-md text-xl font-semibold"
                        type="submit"
                    >
                        Place Bet
                    </button>
                </form>
            </div>
        </Modal>
    );
};
