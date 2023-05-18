import createPassword from './generators';

const generatePass = document.querySelector('.password');
const amountCharacters = document.querySelector('.characters');
const uCase = document.querySelector('.u-case');
const lCase = document.querySelector('.l-case');
const numbers = document.querySelector('.numbers');
const symbols = document.querySelector('.symbols');
const createBtn = document.querySelector('.create-password');

export default () => {
    createBtn.addEventListener('click', () => {
        generatePass.innerText = generate();
    });
};

amountCharacters.addEventListener('input', () => {
    if (amountCharacters.value > 50) amountCharacters.value = 50;
}); 

function generate() {
    const pass = createPassword(
        amountCharacters.value,
        uCase.checked,
        lCase.checked,
        numbers.checked,
        symbols.checked
    );
    return pass || 'Nada selecionado';
}

