//alert("Bem vindo!!");

var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;
var pontos = 0;
var moedas = parseInt(localStorage.getItem('MoedasTotal')) || 0 ;

var nomeJogador = localStorage.getItem('NomeJogador')
var nivel = localStorage.getItem('nivelJogo');
//atribuir zero aos pontos
localStorage.setItem('ponts', 0);

var tempoCriaMosquito = 1700;

if (nivel === "Fácil") {
    tempoCriaMosquito = 1700;
} else if (nivel === "Médio") {
    tempoCriaMosquito = 1200;
} else if (nivel === "Dificil") {
    tempoCriaMosquito = 600;
} else if (nivel==='Chucknorris'){
    tempoCriaMosquito = 400;
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

function posicaoRandomica() {
    if (document.getElementById('mroxo')) {
        document.getElementById('mroxo').remove();

        if (vidas > 3) {
            window.location.href='gameover.html'
        } else {
            document.getElementById('v' + vidas).src="imagens/morto.png";
            vidas++;
        }
    }
    var posicaoX = Math.floor(Math.random() * largura) -90;
    var posicaoY = Math.floor(Math.random() * altura) -90;
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    console.log(posicaoX, posicaoY);

    //criar o elemento html
    var mroxo = document.createElement('img');
    mroxo.src = 'imagens/mroxo.png';
    mroxo.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mroxo.style.left = posicaoX + 'px';
    mroxo.style.top = posicaoY + 'px';
    mroxo.style.position = 'absolute';
    mroxo.id = 'mroxo';
    document.body.appendChild(mroxo);

    mroxo.onclick = function() {
        if (this.classList.contains('mroxo2')) {
            pontos += 2;
            moedas += 2;
        } else if (this.classList.contains('mroxo3')) {
            pontos += 1;
            moedas += 1;
        } else {
            pontos += 3;
            moedas += 3;
        }

        //console.log(pontos);
        localStorage.setItem('ponts', pontos);
        document.getElementById("pontuacao").innerHTML = pontos;
        this.remove();
        localStorage.setItem('MoedasTotal', moedas);
        document.getElementById('moeda').innerHTML = moedas;
    }
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random()*3);

    switch(classe) {
        case 0:
            return 'mroxo1';
        case 1:
            return 'mroxo2';
        case 2:
            return 'mroxo3';
    }
}

function ladoAleatorio() {
    var lado = Math.floor(Math.random()*2);

    switch(lado) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}

var cronometro = setInterval(function() {
    tempo-=1;

    if (tempo < 0) {
        clearInterval(cronometro);
        window.location.href = 'vitoria.html';
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000)