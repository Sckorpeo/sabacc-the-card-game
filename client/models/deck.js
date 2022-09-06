class Deck {
    constructor(cards = []) {
        this.cards = cards; // Array of Cards [{number: 8, suit: square, sign: positive }]
        this.length = cards.length; // integer
    }
    draw() {
        if (this.length) {
            const drawnCard = this.cards.shift();
            this.length = this.cards.length;
            return drawnCard;
        }
        return null;
    }
    addCard(card) {
        this.cards.unshift(card);
        this.length = this.cards.length;
        return 1;
    }
}

export default Deck;
