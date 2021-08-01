import React, { useEffect, useState } from 'react';
import { CardType } from '../components/game/Card';
import { PlayActions } from '../components/common/PlayActions';
import { useMediaQuery } from '../lib/useMediaQuery';
import { PlaceBetModal } from '../components/common/PlaceBetModal';
import { Cards } from '../components/common/Cards';
import { BetStatusBox } from '../components/common/BetStatusBox';

const testCards: CardType[] = [
    { suit: 'club', number: 10 },
    { suit: 'club', number: 10 },
    { suit: 'club', number: 10 },
];

const testCards2: CardType[] = [{ suit: 'club', number: 10 }, { back: true }];

const Play = () => {
    const [state, setState] = useState({});
    const [bet, setBet] = useState<string>('25');
    const [placeBet, setPlaceBet] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState(true);
    let md = useMediaQuery('(max-width: 1024px)');
    let sm = useMediaQuery('(max-width: 450px)');
    const cardSize = sm ? 'sm' : md ? 'md' : 'lg';

    const handleBet = (bet: string) => {
        setBet(bet);
        setPlaceBet(false);
    };

    useEffect(() => {
        // setPlaceBet(true);
    }, []);

    return (
        <div className="bg-pokerGreen w-full relative min-h-screen">
            {placeBet && <PlaceBetModal bet={bet} onSubmit={handleBet} />}
            <div className="container flex flex-col place-items-center md:pt-8 relative z-10 mx-auto">
                <div className="mx-auto w-max relative">
                    {/* <HandMessage /> */}
                    <h2 className="text-xl font-semibold text-white opacity-80 text-center -mb-2">
                        Dealer
                    </h2>
                    <Cards cards={testCards2} size={cardSize} />
                </div>
                <div className="relative">
                    {/* <Message /> */}
                    <h2 className="font-semibold text-white opacity-20 text-center mt-2 lg:mt-3 mb-4 xsm:py-6 md:py-6 text-3xl xsm:text-5xl lg:text-7xl tracking-widest font-serif">
                        Black Jack
                    </h2>
                    {isFinished && (
                        <div
                            className="absolute top-1/2 left-1/2"
                            style={{ transform: 'translate(-50%, -50%)' }}
                        >
                            <button className="px-3 py-3 bg-lightBlue-600 hover:bg-lightBlue-700 rounded text-white text-xl whitespace-nowrap active:bg-lightBlue-800 active:shadow-inner shadow-md focus:outline-none">
                                Start Round
                            </button>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <div className="lg:absolute lg:-right-48">
                        <BetStatusBox bet={bet} total={'450'} onClick={() => setPlaceBet(true)} />
                    </div>
                    <div className="mx-auto w-max">
                        {/* <HandMessage /> */}
                        <h2 className="text-xl font-semibold text-white opacity-80 text-center -mb-2">
                            You
                        </h2>
                        <Cards cards={testCards} size={cardSize} />
                        <PlayActions />
                    </div>
                </div>
            </div>
            <div className="radial absolute top-0 w-full z-0" />
        </div>
    );
};

export default Play;
