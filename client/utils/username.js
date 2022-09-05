const generateRandomUsername = (baseString, nums) => {
    const randomNums = [];
    let username = `${baseString}`;

    for (let i = 0; i < nums; i++) {
        randomNums.push(Math.floor(Math.random() * 9) + 1);
    }

    randomNums.forEach((num) => (username = username + num));

    return username;
};

export { generateRandomUsername };
