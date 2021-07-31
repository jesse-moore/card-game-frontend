import React from 'react';
import { Card } from '../components/game/Card';
import { useMediaQuery } from '../lib/useMediaQuery';

const Play = () => {
    let md = useMediaQuery('(max-width: 1024px)');
    let sm = useMediaQuery('(max-width: 450px)');
    const cardSize = sm ? 'sm' : md ? 'md' : 'lg';

    return (
        <div className="bg-pokerGreen w-full h-screen relative">
            <div className="container flex flex-col place-items-center md:pt-16 relative z-10 mx-auto">
                <div className="mx-auto w-max">
                    <h2 className="text-xl font-semibold text-white opacity-80 text-center -mb-2">
                        Dealer
                    </h2>
                    <div className="flex flex-row">
                        <Card suit="club" number={3} size={cardSize} />
                        <Card back size={cardSize} />
                    </div>
                </div>
                <h2 className="font-semibold text-white opacity-20 text-center mt-2 lg:mt-3 mb-4 xsm:py-6 md:py-12 text-3xl xsm:text-5xl lg:text-7xl tracking-widest font-serif">Black Jack</h2>
                <div className="relative">
                    <div className="lg:absolute lg:-right-48">
                        <div className="flex flex-row lg:flex-col whitespace-nowrap w-min lg:w-36 border-2 border-white rounded-lg text-center font-semibold text-sm xsm:text-lg text-white px-3 py-2 xsm:px-6 xsm:py-4 mx-auto place-items-center">
                            <div>
                                Total Bet<span className="lg:hidden mr-1">:</span>
                            </div>
                            <div>25.00</div>
                            <div className="lg:border-b lg:border-white my-4 w-full mr-4 lg:mr-0" />
                            <div>
                                Total Cash<span className="lg:hidden mr-1">:</span>
                            </div>
                            <div>450.00</div>
                        </div>
                    </div>
                    <div className="mx-auto w-max">
                        <h2 className="text-xl font-semibold text-white opacity-80 text-center -mb-2">
                            You
                        </h2>
                        <div className="flex flex-row">
                            <Card back size={cardSize} />
                            <Card back size={cardSize} />
                        </div>
                        <div className="flex flex-row justify-center text-xl my-4">
                            <button className="rounded bg-red-700 hover:bg-red-900 text-white h-16 w-24 shadow-md mx-4">
                                Stand
                            </button>
                            <button className="rounded bg-lightBlue-700 hover:bg-lightBlue-900 text-white h-16 w-24 shadow-md mx-4">
                                Hit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="radial absolute top-0 w-full z-0" />
        </div>
    );
};

export default Play;
