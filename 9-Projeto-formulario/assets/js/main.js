class validateForm {
    constructor() {
        this.form = document.querySelector('.form')
        this.events();  // executando cadeia de métodos
    }

    // capturando evento submit
    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    // ao enviar formulário
    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.validFields();
        const validPasswords = this.validPasswords();

        if (validFields && validPasswords) {
            alert('Formulário enviado');
            // this.form.submit();
        }
    }

    // validar senhas
    validPasswords() {
        let valid = true;

        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeat-password');

        if (password.value !== repeatPassword.value) {
            valid = false;
            this.createError(password, 'Campos Senha e Repetir Senha precisam ser iguais');
            this.createError(repeatPassword, 'Campos Senha e Repetir Senha precisam ser iguais');
        }

        if (password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, 'Senha precisa ter entre 6 e 12 caracteres');
        }
        return valid;
    }

    // validar campos
    validFields() {
        let valid = true;

        // remover TODOS os erros
        for (const errorText of this.form.querySelectorAll(".error-text")) {
            errorText.remove();
        }
        
        // testando se há erros
        for (const field of this.form.querySelectorAll('.validate')) {
            const label = field.previousElementSibling.innerText;
            if (!field.value) {
                this.createError(field, `Campo ${label} não pode estar vazio`);
                valid = false;
            }

            if (field.classList.contains("cpf")) {
                if (!this.validateCPF(field)) valid = false;
            }
            else if (field.classList.contains("user")) {
                if (!this.validateUser(field)) valid = false;
            }
        }
        return valid;
    }

    // validar CPF
    validateCPF(field) {
        const cpf = new ValidateCPF(field.value);
        if (!cpf.validate()) {
            this.createError(field, 'CPF inválido');
            return false;
        }
        return true;
    }
    
    // validar usuário
    validateUser(field) {
        const user = field.value
        let valid = true;

        if (user.length < 3 || user.length > 12) {
            this.createError(field, 'Usuário deve ter entre 3 e 12 caracteres');
            valid = false;
        }
        
        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Nome de usuário precisa conter apenas letras e/ou números');
            valid = false;
        }
        return valid;
    }

    // criando div error
    createError(field, msg) {
        const div = document.createElement("div");
        div.innerHTML = msg;
        div.classList.add("error-text");
        field.insertAdjacentElement('afterend', div);
    }

}

const validates = new validateForm();
