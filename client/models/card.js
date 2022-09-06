class Card {
    constructor(number, suit = null, sign = null) {
        this.number = number; // integer
        this.suit = suit; // string ( 'circle' or 'square' or 'triangle')
        this.sign = sign; // string ('negative' or 'positive')
        this.id = `${this.number}${this.suit}${this.sign}`; // string '8squarepositive'
    }
}

export default Card;
