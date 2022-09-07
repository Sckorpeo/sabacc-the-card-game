class Player {
    constructor(username, socketId, hand = []) {
        this.username = username; // string
        this.socketId = socketId; // string
        this.hand = hand; // Array of Cards [{number: 8, suit: square, sign: positive }]
        this.handTotal = this.getHandTotal();
    }
    getHandTotal() {
        return this.hand.reduce((reducer, card) => {
            if (card.sign === 'positive') {
                return reducer + card.number;
            } else {
                return reducer - card.number;
            }
        }, 0);
    }
    addToHand(card) {
        this.hand.unshift(card);
        return 1;
    }
    removeFromHand(cardId) {
        const removedCard = this.hand.find((card) => card.id === cardId);
        if (removedCard) {
            this.hand = this.hand.filter((card) => card.id !== cardId);
            return removedCard;
        } else {
            return null;
        }
    }
    trade(oldCardId, newCard) {
        const removedCard = this.hand.find((card) => card.id === oldCardId);
        if (removedCard) {
            this.hand = [
                ...this.hand.map((card) => {
                    if (card.id === oldCardId) {
                        return newCard;
                    } else {
                        return card;
                    }
                }),
            ];
        } else {
            return null;
        }
    }
}

export default Player;
