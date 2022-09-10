import { createDeck, shuffle } from './cards';

const draw = (game) => {
    return game.deck.shift();
};

const discard = (game, card) => {
    return game.discard.unshift(card);
};

const discardDraw = (game) => {
    return game.discard.shift();
};

const addCardToHand = (game = {}, playerId, card) => {
    const curPlayer = game.players?.find(
        (player) => player.socketId === playerId
    );
    curPlayer?.hand?.push(card);
    return game;
};

const skipTurn = (game) => {
    const indexOfCurPlayer = game.players.findIndex(
        (player) => player.socketId === game.curPlayer
    );

    if (game.players.length - 1 === indexOfCurPlayer) {
        // This means its the end of the round
        updateRound(game);
        if (checkIfGameOver(game)) {
            game.curPlayer = '';
            return game;
        }
        game.curPlayer = game.players[0].socketId;
    } else {
        game.curPlayer = game.players[indexOfCurPlayer + 1].socketId;
    }
    return game;
};

const updateRound = (game) => {
    game.round = game.round + 1;
};

const checkIfGameOver = (game) => {
    const indexOfCurPlayer = game.players.findIndex(
        (player) => player.socketId === game.curPlayer
    );

    if (game.players.length - 1 === indexOfCurPlayer && game.round === 3) {
        game.gameOver = true;
        return true;
    }
};

const discardAndDraw = (game, card) => {
    const curPlayer = game.players.find(
        (player) => player.socketId === game.curPlayer
    );
    const drawnCard = draw(game);
    curPlayer.hand = curPlayer.hand.map((cd) =>
        cd.id === card.id ? drawnCard : cd
    );
    curPlayer.handTotal = getHandTotal(curPlayer.hand);
    discard(game, card);
    return skipTurn(game);
};

const tradeWithDiscard = (game, card) => {
    const curPlayer = game.players.find(
        (player) => player.socketId === game.curPlayer
    );
    const discardTopCard = discardDraw(game);
    curPlayer.hand = curPlayer.hand.map((cd) =>
        cd.id === card.id ? discardTopCard : cd
    );
    curPlayer.handTotal = getHandTotal(curPlayer.hand);
    discard(game, card);
    return skipTurn(game);
};

const getHandTotal = (hand) => {
    return hand.reduce((reducer, card) => {
        if (card.sign === 'pos') {
            return reducer + card.number;
        } else if (card.sign === 'neg') {
            return reducer - card.number;
        } else {
            return reducer;
        }
    }, 0);
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
        player.handTotal = getHandTotal(player.hand);
    });

    // set the round
    game.round = 1;

    // set current player
    game.curPlayer = game.players[0].socketId;

    // set game started
    game.gameStarted = true;

    return game;
};

export {
    draw,
    discard,
    addCardToHand,
    initGame,
    skipTurn,
    discardAndDraw,
    tradeWithDiscard,
};
