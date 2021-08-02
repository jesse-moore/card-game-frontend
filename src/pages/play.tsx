import React, { useEffect, useState, MouseEventHandler } from 'react';
import { useMediaQuery } from '../lib/useMediaQuery';
import { useAuth } from '../lib/useAuth';
import { useWarningOnExit } from '../lib/useWarnOnExit';
import { PlayActions } from '../components/common/PlayActions';
import { PlaceBetModal } from '../components/common/PlaceBetModal';
import { Cards } from '../components/common/Cards';
import { BetStatusBox } from '../components/common/BetStatusBox';
import { Layout } from '../components/common/Layout';
import {
    useGetUserQuery,
    useStartGameMutation,
    User,
    GameStatus,
    useGameActionMutation,
    useStartRoundMutation,
    useRestoreBalanceMutation,
    useRemoveGameMutation,
} from '../graphql/queries';
import { HandMessage } from '../components/common/HandMessage';
import { Message } from '../components/common/Message';
import { RestoreBalanceModal } from '../components/common/RestoreBalanceModal';
import { ReshuffledModal } from '../components/common/ReshuffledModal';

const initialState = {
    id: '',
    dealer: { id: '', cards: [], count: 0, status: 0, cash: 0, winLose: 0 },
    player: { id: '', cards: [], count: 0, status: 0, cash: 0, winLose: 0 },
    isStarted: false,
    isWaiting: false,
    isFinished: true,
    reshuffled: false,
};

const Play = () => {
    const auth = useAuth();
    const { data: userData, error: userError, loading } = useGetUserQuery();
    const [startGame] = useStartGameMutation();
    const [gameAction] = useGameActionMutation();
    const [startRound] = useStartRoundMutation();
    const [restoreBalanceMutation] = useRestoreBalanceMutation();
    const [removeGame] = useRemoveGameMutation();
    const [userState, setUserState] = useState<User>({ id: '', cash: 0 });
    const [gameState, setgameState] = useState<GameStatus | null>(initialState);
    const [bet, setBet] = useState<string>('25');
    const [placeBet, setPlaceBet] = useState<boolean>(false);
    const [restoreBalance, setRestoreBalance] = useState(false);
    const [reshuffledModal, setReshuffledModal] = useState(false);

    const { cash } = userState;
    const { dealer, player, isStarted, isWaiting, isFinished, id, reshuffled } = gameState;
    const isGuest = auth.user ? false : true;

    let md = useMediaQuery('(max-width: 1024px)');
    let sm = useMediaQuery('(max-width: 450px)');
    const cardSize = sm ? 'sm' : md ? 'md' : 'lg';

    const message = 'Are you sure that you want forfeit the game?';
    useWarningOnExit(!isFinished, message, gameState.id, () => handleRemoveGame);

    const handleBet = (bet: string) => {
        setBet(bet);
        setPlaceBet(false);
    };

    const handleRemoveGame = async (id: string) => {
        if (!id) return;
        // await removeGame({ variables: { id } });
    };

    useEffect(() => {
        if (!isStarted) setPlaceBet(true);
        return () => {
            handleRemoveGame(gameState.id);
        };
    }, [gameState.id]);

    useEffect(() => {
        if (userError || !userData) return;
        const { getUser } = userData;
        if (getUser) {
            setUserState(getUser);
        }
    }, [userData]);

    useEffect(() => {
        const rb = async () => {
            const { data } = await restoreBalanceMutation({
                variables: { id: gameState.id, playerId: isGuest ? userState.id : undefined },
            });
            if (data) setUserState({ ...userState, cash: data.restoreBalance });
        };
        if (!loading && userState.cash <= 0) {
            setRestoreBalance(true);
            rb();
        }
    }, [userState.cash]);

    useEffect(() => {
        if (reshuffled) {
            setReshuffledModal(true);
        }
    }, [reshuffled]);

    const handleStartGame = async () => {
        const { data, errors } = await startGame({
            variables: { playerId: userState.id, bet: Number(bet) },
        });
        if (!errors && data) {
            setgameState(data.newGame);
            setUserState({ ...userState, cash: data.newGame.player.cash });
        }
    };

    const handleStartRound = async () => {
        const { data, errors } = await startRound({
            variables: { id, bet: Number(bet), playerId: isGuest ? userState.id : undefined },
        });
        if (!errors && data) {
            setgameState(data.startNewRound);
            setUserState({ ...userState, cash: data.startNewRound.player.cash });
        }
    };

    const handleGameAction: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
        const { name } = currentTarget;
        const sendAction = async () => {
            const { data, errors } = await gameAction({
                variables: { id, action: name, playerId: isGuest ? userState.id : undefined },
            });
            if (!errors && data) {
                setgameState(data.gameAction);
                setUserState({ ...userState, cash: data.gameAction.player.cash });
            }
        };
        sendAction();
    };

    return (
        <Layout>
            <div className="bg-pokerGreen w-full relative min-h-screen pt-10">
                {placeBet && <PlaceBetModal bet={bet} onSubmit={handleBet} />}
                {restoreBalance && (
                    <RestoreBalanceModal handleClose={() => setRestoreBalance(false)} />
                )}
                {reshuffledModal && (
                    <ReshuffledModal handleClose={() => setReshuffledModal(false)} />
                )}
                <div className="container flex flex-col place-items-center pt-4 relative z-10 mx-auto">
                    <div className="mx-auto w-max relative">
                        {isFinished && dealer.status > 1 && <HandMessage state={dealer.status} />}
                        <h2 className="text-xl font-semibold text-white opacity-80 text-center -mb-2">
                            Dealer
                        </h2>
                        <Cards cards={dealer.cards} size={cardSize} />
                    </div>
                    <div className="relative">
                        {isFinished && player.winLose > 0 && (
                            <Message {...{ status: player.winLose, amount: Number(bet) }} />
                        )}
                        <h2 className="font-semibold text-white opacity-20 text-center mt-2 lg:mt-1 mb-2 xsm:py-6 md:py-6 text-3xl xsm:text-5xl lg:text-7xl tracking-widest font-serif">
                            Black Jack
                        </h2>
                        {isFinished && (
                            <div
                                className="absolute top-1/2 left-1/2"
                                style={{ transform: 'translate(-50%, -50%)' }}
                            >
                                <StartButton
                                    title="Start Round"
                                    onClick={
                                        gameState.id === '' ? handleStartGame : handleStartRound
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <div className="lg:absolute lg:-right-48">
                            <BetStatusBox
                                bet={bet}
                                total={cash.toString()}
                                onClick={() => setPlaceBet(true)}
                                disablePlaceBet={!isFinished}
                            />
                        </div>
                        <div className="mx-auto w-max">
                            {isFinished && player.status > 1 && (
                                <HandMessage state={player.status} />
                            )}
                            <h2 className="text-xl font-semibold text-white opacity-80 text-center -mb-2">
                                You
                            </h2>
                            <Cards cards={player.cards} size={cardSize} />
                            <PlayActions onClick={handleGameAction} disabled={!isWaiting} />
                        </div>
                    </div>
                </div>
                <div className="radial absolute top-0 w-full z-0" />
            </div>
        </Layout>
    );
};

interface StartButton {
    title: string;
    onClick: MouseEventHandler;
}

const StartButton = ({ title, onClick }: StartButton) => {
    return (
        <button
            className="px-3 py-3 bg-lightBlue-600 hover:bg-lightBlue-700 rounded text-white text-xl whitespace-nowrap active:bg-lightBlue-800 active:shadow-inner shadow-md focus:outline-none"
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default Play;
