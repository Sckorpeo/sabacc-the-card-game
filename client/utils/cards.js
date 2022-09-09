const createDeck = () => {
    const res = [
        { number: 0, id: 'sylop01', imgNum: '0' },
        { number: 0, id: 'sylop02', imgNum: '0' },
    ];
    ['cir', 'sqr', 'tri'].forEach((suit) => {
        for (let i = 1; i < 11; i++) {
            let imgNum = i < 10 ? `0${i}` : '10';
            res.push({
                number: i,
                suit: suit,
                sign: 'neg',
                imgNum: imgNum,
                id: `${imgNum}${suit}neg`,
            });
            res.push({
                number: i,
                suit: suit,
                sign: 'pos',
                imgNum: imgNum,
                id: `${imgNum}${suit}pos`,
            });
        }
    });
    return res;
};

const shuffle = (deck) => {
    const randomNumber = (n) => {
        let num = Math.floor(Math.random() * n);
        return num;
    };
    let copyDeck = [...deck];
    let shuffledDeck = [];
    while (shuffledDeck.length < 62) {
        let ranNum = randomNumber(copyDeck.length);
        shuffledDeck.push(copyDeck[ranNum]);
        copyDeck.splice(ranNum, 1);
    }
    return shuffledDeck;
};

export { createDeck, shuffle };
