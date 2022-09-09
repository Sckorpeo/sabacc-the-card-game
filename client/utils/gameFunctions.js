import { createDeck, shuffle } from './cards';

const draw = (game) => {
    return game.deck.shift();
};

const discard = (game, card) => {
    return game.discard.unshift(card);
};

const addCardToHand = (game = {}, playerId, card) => {
    const curPlayer = game.players?.find(
        (player) => player.socketId === playerId
    );
    curPlayer?.hand?.push(card);
    return game;
};

const initGame = (game = {}) => {
    // create sabacc deck and shuffle
    game.deck = shuffle(createDeck());

    // flip first card
    discard(game, draw(game));

    // deal 5 cards to each player
    game.players.forEach((player) => {
        while (player.hand.length < 6) {
            let card = draw(game);
            addCardToHand(game, player.socketId, card);
        }
    });

    // set current player
    game.curPlayer = game.players[0].socketId;

    // set game started
    game.gameStarted = true;

    return game;
};

export { draw, discard, addCardToHand, initGame };
