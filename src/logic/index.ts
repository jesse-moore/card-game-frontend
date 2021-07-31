const suits = ['Clubs', 'Spades', 'Diamonds', 'Hearts']

export class Card {
    suit: string
    value: number
    symbol: string
    constructor({ suit, value, symbol }) {
        this.suit = suit
        this.value = value
        this.symbol = symbol
    }
}

class Player {
    id: string
    cards: Card[]
    count: number
    status: 0 | 1 | 2 | 3 | 4
    // 0: playing, 1: played, 2: natural, 3: black jack, 4: bust
    isDealer: boolean
    constructor({ id }: { id: string }) {
        this.id = id
        this.cards = []
        this.count = 0
        this.status = 0
    }
    updateStatus() {
        let hasAce = false
        this.count = this.cards.reduce((a, c) => {
            if (c.value === 11) hasAce = true
            return a + c.value
        }, 0)
        if (this.count > 21 && hasAce) this.count -= 10
        if (this.cards.length === 2 && this.count === 21) {
            this.status = 2
        } else if (this.count === 21) {
            this.status = 3
        } else if (this.count > 21) {
            this.status = 4
        }
    }
    addCard(cards) {
        this.cards = [...this.cards, ...cards]
        this.updateStatus()
    }
    getStatus() {
        return {
            cards: this.cards,
            count: this.count,
            status: this.status,
            id: this.id,
        }
    }
    reset() {
        this.cards = []
        this.count = 0
        this.status = 0
    }
}

export class Game {
    numberOfDecks: number
    isStarted: boolean
    isWaiting: boolean
    isFinished: boolean
    dealer: Player
    player: Player
    shoe: Card[]
    spentCards: Card[]
    reshuffleLimit: number
    reshuffleCount: number
    constructor({ playerId }: { playerId: string }) {
        this.numberOfDecks = 1
        this.dealer = new Player({ id: 'dealer' })
        this.player = new Player({ id: playerId })
        this.shoe = []
        this.spentCards = []
        this.reshuffleLimit = 0.75
        this.reshuffleCount = this.numberOfDecks * this.reshuffleLimit * 52
        this.buildGame()
    }
    buildGame() {
        this.shoe = this.buildDeck()
        this.shuffleDeck()
    }
    buildDeck() {
        const deck = []
        for (let i = 0; i < this.numberOfDecks; i++) {
            for (var suit of suits) {
                for (let value = 2; value < 11; value++) {
                    deck.push(new Card({ suit, value, symbol: value }))
                }
                for (let symbol of ['J', 'Q', 'K']) {
                    deck.push(new Card({ suit, value: 10, symbol }))
                }
                deck.push(new Card({ suit, value: 11, symbol: 'A' }))
            }
        }
        return deck
    }
    shuffleDeck() {
        for (var i = this.shoe.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1))
            var temp = this.shoe[i]
            this.shoe[i] = this.shoe[j]
            this.shoe[j] = temp
        }
    }
    getDealer(options: { hideSecondCard?: boolean } = {}) {
        const { hideSecondCard = false } = options
        if (hideSecondCard) {
            return {
                status: this.dealer.status,
                cards: [this.dealer.cards[0]],
                count: this.dealer.cards[0].value,
                id: this.dealer.id,
            }
        } else {
            return {
                status: this.dealer.status,
                cards: this.dealer.cards,
                count: this.dealer.count,
                id: this.dealer.id,
            }
        }
    }
    getPlayer() {
        return {
            status: this.player.status,
            cards: this.player.cards,
            count: this.player.count,
            id: this.player.id,
        }
    }
    startNextRound() {
        if (!this.isFinished) return
        this.player.reset()
        this.dealer.reset()
        return this.startRound()
    }
    startGame() {
        if (this.isStarted) return
        this.isStarted = true
        return this.startRound()
    }
    startRound() {
        this.player.addCard(this.dealCard(2))
        this.dealer.addCard(this.dealCard(2))
        this.isFinished = false
        this.isWaiting = true
        this.updateGameStatus()
        return this.getGameStatus()
    }
    updateGameStatus() {
        const dealer = this.dealer
        const player = this.player
        if (player.status > 1 || dealer.status > 1) this.stand()
    }
    getGameStatus() {
        const status = {
            player: this.getPlayer(),
            isStarted: this.isStarted,
            isWaiting: this.isWaiting,
            isFinished: this.isFinished,
            dealer: this.getDealer({ hideSecondCard: true }),
        }
        if (this.player.status > 0 || this.isFinished) {
            status.dealer = this.getDealer()
        }
        return status
    }
    dealCard(cards: number) {
        const deal = []
        for (let i = 0; i < cards; i++) {
            const card = this.shoe.pop()
            deal.push(card)
            this.spentCards.push(card)
        }
        return deal
    }
    action({ action }: { action: string }) {
        if (!this.isWaiting || this.isFinished) return
        const player = this.player
        switch (action) {
            case 'hit':
                this.hit(player)
                break
            case 'stand':
                this.player.status = 1
                this.stand()
                break
            default:
        }
        this.updateGameStatus()
        return this.getGameStatus()
    }
    hit(player: Player) {
        if (player.count > 20) return
        player.addCard(this.dealCard(1))
    }
    stand() {
        this.isWaiting = false
        if (this.player.status === 1 || this.player.status === 3) {
            while (this.dealer.count < 17) {
                this.hit(this.dealer)
            }
        }
        if (this.dealer.count < 21) this.dealer.status = 1
        this.endRound()
    }
    endRound() {
        this.isFinished = true
        if (this.spentCards.length >= this.reshuffleCount) {
            this.shoe = [...this.shoe, ...this.spentCards]
            this.spentCards = []
            this.shuffleDeck()
        }
    }
}

const dealerStrategy = (dealer: Player) => {}
