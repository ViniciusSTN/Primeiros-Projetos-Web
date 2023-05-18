var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 0

// Selecionar o nível escolhido
var nivel = window.location.search // retornará a query string, ou seja, tudo o que estiver após o '?'
nivel = nivel.replace('?', '') // trocar todos os caracteres '?' por ''

if (nivel === 'normal') {
    criaMosquitoTempo = 1500
} 
    else if (nivel === 'dificil') {
        criaMosquitoTempo = 1000
    } 
        else if (nivel === 'pro') {
            criaMosquitoTempo = 750
        }

// Capturar tamanho da tela
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

// Cronometro
var cronometro = setInterval(function() {
    tempo -= 1
    // Vitoria
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    }
    else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)


// Setar os mosquitos na tela
function posicaoRandomica() {
    // remover mosquito anterior caso exista
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html'
        } 
        else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas++
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    // Criar elemento HTML
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)
}

// Gerar tamanho aleatório do mosquito
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)
    
    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

// Gerar lado aleatório do mosquito
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)
    
    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    } 
}