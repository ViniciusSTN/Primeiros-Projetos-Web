import ValidateCPF from "./ValidateCPF";

export default class GenerateCPF {
    static rand(min = 100000000, max = 999999999) {
        return String(Math.floor(Math.random() * (max - min) + min));
    }

    static format(cpf) {
        return (
            cpf.slice(0, 3) + '.' +
            cpf.slice(3, 6) + '.' +
            cpf.slice(6, 9) + '-' +
            cpf.slice(9, 11)
        );
    }

    static generate() {
        const cpfWithoutDigits = GenerateCPF.rand();
        const digit1 = ValidateCPF.createDigits(cpfWithoutDigits);
        const digit2 = ValidateCPF.createDigits(cpfWithoutDigits + digit1);
        const newCpf = cpfWithoutDigits + digit1 + digit2;
        return GenerateCPF.format(newCpf);
    }
}
