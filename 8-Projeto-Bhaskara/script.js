function setTermsValue(event, id) {
    let element = document.getElementsByClassName(id + '-element')
    Array.from(element).forEach(e => {
        e.textContent = event.target.value == ''? id : event.target.value
    })
    terms[id] = event.target.value
    validate()
}

let terms = {
    a: 0,
    b: 0,
    c: 0,
}

const existenceTest = {
    test1: (a) => {
        return a != 0 ? true : false
    },

    test2: (delta) => {
        return delta >= 0 ? true : false
    }
}

function validate() {
    error = document.getElementById('error')
    if (existenceTest.test1(terms.a)) {
        error.textContent = ''
        let delta = deltaCalculate()
        if (existenceTest.test2(delta)) {
            error.textContent = ''
            calculate(delta)
        }
        else {
            error.textContent = 'Delta negativo'
        }
    }
    else {
        error.textContent = 'Termo A deve ser diferente de zero'
    }
}

function deltaCalculate() {
    let delta = (Math.pow(terms.b, 2)) - 4 * terms.a * terms.c
    return delta
}

function calculate(delta) {
    const result1 = (-terms.b * Math.pow(delta, 1/2)) / (2 * terms.a)
    const result2 = (-terms.b * (-Math.pow(delta, 1/2))) / (2 * terms.a)

    let x1 = document.getElementById('x1')
    let x2 = document.getElementById('x2')

    x1.value = result1
    x2.value = result2
}

