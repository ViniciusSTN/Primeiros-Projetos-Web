import GenerateCPF from './modules/GenerateCPF';
import ValidateCPF from './modules/ValidateCPF';
import './assets/css/style.css';

const cpfDiv = document.querySelector('.cpf');
const btnCopy = document.querySelector('.copy');
const returnDiv = document.querySelector('.return');
const input = document.querySelector('.cpf-sent');

cpfDiv.innerText = GenerateCPF.generate();

document.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('copy')) {
        copyText();
    }
    else if (target.classList.contains('new')) {
        cpfDiv.innerText = GenerateCPF.generate();
        notCopied()
    }
    else if (target.classList.contains('check')) {
        const cpf = document.querySelector('.cpf-sent').value
        const validateCPF = new ValidateCPF(cpf);
        const valid = validateCPF.validate();
        returnValid(valid);
    }
});

input.addEventListener('input', () => {
    returnDiv.innerText = '';
});

function copyText() {
    try {
        navigator.clipboard.writeText(cpfDiv.innerText);
        copied();
    }
    catch (e) {
        console.error(e);
        notCopied()
    }
}

function copied() {
    btnCopy.innerText = 'Copiado';
    btnCopy.classList.remove('btn-blue');
    btnCopy.classList.add('copied');
}

function notCopied() {
    btnCopy.innerText = 'Copiar';
    btnCopy.classList.remove('copied');
    btnCopy.classList.add('btn-blue');
}

function returnValid(valid) {
    if (valid) {
        returnDiv.innerText = 'Válido'
        returnDiv.classList.remove('invalid');
        returnDiv.classList.add('valid');
    }
    else {
        returnDiv.innerText = 'Inválido';
        returnDiv.classList.remove('valid');
        returnDiv.classList.add('invalid');
    }    
}
