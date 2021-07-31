import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import { Card, Game } from '../logic'

const game = new Game({ playerId: '0' })
const testDeck = []
testDeck.push(new Card({ suit: 'Clubs', value: 10, symbol: 'K' }))
testDeck.push(new Card({ suit: 'Clubs', value: 11, symbol: 'A' }))
testDeck.push(new Card({ suit: 'Clubs', value: 10, symbol: 10 }))
testDeck.push(new Card({ suit: 'Clubs', value: 6, symbol: 6 }))
testDeck.push(new Card({ suit: 'Clubs', value: 10, symbol: 10 }))
testDeck.push(new Card({ suit: 'Clubs', value: 10, symbol: 10 }))
// game.shoe = testDeck

interface GameStatus {
    dealer: PlayerStatus
    player: PlayerStatus
    isStarted: boolean
    isWaiting: boolean
    isFinished: boolean
}

interface PlayerStatus {
    count: number
    cards: CardInterface[]
    status: 0 | 1 | 2 | 3 | 4
    id: string
}

interface CardInterface {
    suit: string
    value: number
    symbol: string
}

const initialGameStatus: GameStatus = {
    dealer: {
        id: 'dealer',
        cards: [],
        count: 0,
        status: 0,
    },
    player: {
        id: 'player',
        cards: [],
        count: 0,
        status: 0,
    },
    isStarted: false,
    isWaiting: false,
    isFinished: false,
}

const IndexPage = () => {
    const [status, setStatus] = useState<GameStatus>(initialGameStatus)

    const handleStartGame = () => {
        const state = game.startGame()
        if (!state) return
        setStatus(state)
    }

    const handleStartNextRound = () => {
        const state = game.startNextRound()
        if (!state) return
        setStatus(state)
    }

    const handleAction = (action: string) => {
        const newState = game.action({ action })
        if (!newState) return
        setStatus(newState)
    }

    return (
        <Layout>
            <div>
                <div>
                    <button
                        className="px-2 py-1 bg-gray-300 rounded m-2"
                        onClick={handleStartGame}
                        disabled={game.isStarted}
                    >
                        Start
                    </button>
                    <button
                        className="px-2 py-1 bg-gray-300 rounded m-2"
                        onClick={handleStartNextRound}
                    >
                        Start Next Round
                    </button>
                    <button
                        className="px-2 py-1 bg-gray-300 rounded m-2"
                        onClick={() => handleAction('hit')}
                    >
                        Hit
                    </button>
                    <button
                        className="px-2 py-1 bg-gray-300 rounded m-2"
                        onClick={() => handleAction('stand')}
                    >
                        Stand
                    </button>
                </div>
                <div>
                    <div>
                        <span className="mr-4">Shoe: {game.shoe.length}</span>
                        <span>Spent Cards: {game.spentCards.length}</span>
                    </div>
                    <h2 className="text-3xl">Status</h2>
                    <h3 className="text-xl">Game Status</h3>
                    <div>
                        <span className="mr-4">
                            Is Started: {`${status.isStarted}`}
                        </span>
                        <span className="mr-4">
                            Is Waiting: {`${status.isWaiting}`}
                        </span>
                        <span className="mr-4">
                            Is Finished: {`${status.isFinished}`}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Player</h3>
                        <div>Count: {status.player.count}</div>
                        <div>Status: {status.player.status}</div>
                        <div>
                            Cards:
                            {status.player.cards.map((card) => {
                                return (
                                    <div
                                        className="flex flex-row"
                                        key={`${card.suit}${card.symbol}`}
                                    >
                                        <div>Suit: {card.suit}</div>
                                        <div>Symbol: {card.symbol}</div>
                                        <div>Value: {card.value}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Dealer</h3>
                        <div>Count: {status.dealer.count}</div>
                        <div>Status: {status.dealer.status}</div>
                        <div>
                            Cards:
                            {status.dealer.cards.map((card) => {
                                return (
                                    <div
                                        className="flex flex-row"
                                        key={`${card.suit}${card.symbol}`}
                                    >
                                        <div>Suit: {card.suit}</div>
                                        <div>Symbol: {card.symbol}</div>
                                        <div>Value: {card.value}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
