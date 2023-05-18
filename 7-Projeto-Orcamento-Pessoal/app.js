class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

// local storage - "Banco de dados"
class Bd {
    constructor() {
        let id = localStorage.getItem('id') // retornará null na primeira execução
        if (id === null) {
            localStorage.setItem("id", 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id') 
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        let id = localStorage.getItem('id')
        let despesas = []

        // Recuperar todas as despesas
        for(let i = 1; i <= id; i++) {
            // converter para objetos literais
            let despesa = JSON.parse(localStorage.getItem(i))

            // colocar objetos dentro de um array
            // existe a possibilidade de haver files em local storage que foram removidos, logo retornará null em despesa
            if (despesa === null) {
                continue  // passrá para proxima repetição
            }

            // adicionando novo atributo id
            despesa.id = i

            despesas.push(despesa)
        }
        return despesas
    }

    // FILTRO despesas
    pesquisar(despesa) {
        let despesasFiltradas = []
        despesasFiltradas = this.recuperarTodosRegistros()

        // ano; mes; dia; tipo; descricao; valor
        if(despesa.ano !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if(despesa.mes !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        if(despesa.dia !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        if(despesa.tipo !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        if(despesa.descricao !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        if(despesa.valor !== '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
    }  
}
let bd = new Bd()

// gravar informações
function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value) 

    if(despesa.validarDados()) {
        // gravar dados no Local Storage
        bd.gravar(despesa)

        document.getElementById('modalTitulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modalTituloDiv').className = 'modal-header text-success'
        document.getElementById('modalConteudo').innerHTML = 'Despesa cadastrada com sucesso'
        document.getElementById('modalBtn').innerHTML = 'Voltar'
        document.getElementById('modalBtn').className = 'btn btn-success'

        // Jquery - exibir modal
        $('#modalRegistro').modal('show')

        // Limpando campos 
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    }
    else {
        document.getElementById('modalTitulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modalTituloDiv').className = 'modal-header text-danger'
        document.getElementById('modalConteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente'
        document.getElementById('modalBtn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modalBtn').className = 'btn btn-danger'

        // Jquery - exibir modal
        $('#modalRegistro').modal('show')
    }
}


// Por default é atribuido um Array, para atender ao chamado tanto da função pesquisarDespesa() e ao evento onload da página consulta
// Além de ter um teste para saber se a chamada de função foi chamada pelo filtro ou pelo onload da página. Caso for feita pelo filtro e nenhuma despesa corresponder a esse filtro, nenhuma despesa será carregada
function carregarListaDespesas(despesas = [], filtro = false) {

    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
    }

    // recuperando o <tbody>
    let listaDespesas = document.getElementById("listaDespesas")
    listaDespesas.innerHTML = ''

    /*
    <tr>
        0 = <td>15/03/2018</td>
        1 = <td>Alimentação</td>
        2 = <td>Compras do mes</td>
        3 = <td>444</td>
    </tr>
    */
    
    despesas.forEach(function(d) {
        // criando a linha (<tr>)
        let linha = listaDespesas.insertRow()

        // criando colunas(<td>)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor


        // Botão de exclusão
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        /*
        <button>
            <span class="fas fa-times"></span>
        </button>
        */
        btn.innerHTML = '<span class="fas fa-times"></span>'
        btn.id = `id_despesa_${d.id}`
        linha.insertCell(4).append(btn)

        // remover a despesa
        btn.onclick = function() {
            // id_despesa_1 ==> 1
            let id = this.id.replace('id_despesa_', '')

            bd.remover(id)

            window.location.reload()
        }
    })

}

function pesquisarDespesa() {
    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let tipo = document.getElementById("tipo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value

    let despesaParaFiltro = new Despesa(ano, mes, dia, tipo, descricao, valor)
    
    let despesasFiltradas = bd.pesquisar(despesaParaFiltro)

    carregarListaDespesas(despesasFiltradas, true)

}

