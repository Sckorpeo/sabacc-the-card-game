const generateRoomCode = (n = 5) => {
    let arr = [];
    let res = '';

    while (arr.length < n) {
        let num = Math.floor(Math.random() * 91);
        if (num > 47) {
            if (num < 58 || num > 64) {
                let letter = String.fromCharCode(num);
                arr.push(letter);
                res = res + letter;
            }
        }
    }
    return res;
};

export { generateRoomCode };
