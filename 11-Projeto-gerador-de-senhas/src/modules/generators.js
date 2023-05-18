const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
const generateUcase = () => String.fromCharCode(rand(65, 91));
const generateLcase = () => String.fromCharCode(rand(97, 123));
const generateNum = () => String.fromCharCode(rand(48, 58));
const symbols = ',.;~^[]{}!@#$%*()_-+=';
const generateSymbol = () => symbols[rand(0, symbols.length)];

export default function createPassword(amount, uCase, lCase, num, sym) {
    const passwordArr = [];
    amount = Number(amount);

    for (let i = 0; i < amount; i++) {
        uCase && passwordArr.push(generateUcase());
        lCase && passwordArr.push(generateLcase());
        num && passwordArr.push(generateNum());
        sym && passwordArr.push(generateSymbol());
    }

    return passwordArr.join('').slice(0, amount);
}
