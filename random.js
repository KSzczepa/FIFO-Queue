//random mbers from 1 to param
const rand = (param) => {
    return Math.floor(Math.random() * param) + 1;
};

const randChar = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(rand(charactersLength));
    }
    return result;
};

const randSeed = (seed) => {
    const generator = new Math.seedrandom(seed);
    const randomNumber = Math.floor(generator()*10000);
    return randomNumber;
};