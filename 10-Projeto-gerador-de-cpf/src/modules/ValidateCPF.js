export default class ValidateCPF {
  constructor(cpfSent) {
    Object.defineProperty(this, 'cleanCPF', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfSent.replace(/\D+/g, '')
    });
  }

  sequence() {
    return this.cleanCPF.charAt(0).repeat(11) === this.cleanCPF;
  }

  createNewCPF() {
    const cpfWithoutDigits = this.cleanCPF.slice(0, -2);
    const digit1 = ValidateCPF.createDigits(cpfWithoutDigits);
    const digit2 = ValidateCPF.createDigits(cpfWithoutDigits + digit1);
    this.newCPF = cpfWithoutDigits + digit1 + digit2;
  }

  static createDigits(cpfWithoutDigits) {
    let total = 0;
    let mult = cpfWithoutDigits.length + 1;

    for(let numericalStr of cpfWithoutDigits) {
      total += mult * Number(numericalStr);
      mult--;
    }

    const digit = 11 - (total % 11);
    return digit <= 9 ? String(digit) : '0';
  }

  validate() {
    if(!this.cleanCPF) return false;
    if(typeof this.cleanCPF !== 'string') return false;
    if(this.cleanCPF.length !== 11) return false;
    if(this.sequence()) return false;
    this.createNewCPF();

    return this.newCPF === this.cleanCPF;
  }
}
