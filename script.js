const canvas = document.getElementById('jogoCanvas')
// inicializar o canvas
const ctx = canvas.getContext('2d')
const gravidade = 0.5
let gameOver = false

// Variáveis de pontuação
let pontuacao = 0;
let pontuacaoMaxima = localStorage.getItem('pontuacaoMaxima') || 0; // Armazenar a pontuação máxima

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && personagem.pulando == false) {
        console.log('clicou para pular')
        personagem.velocidade_y = 15
        personagem.pulando = true
    }
})

document.addEventListener('click', (evento) => {
    if (gameOver == true) {
        location.reload();
    }
});

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidade_y: 0,
    pulando: false
}
const obstaculo = {
    x: 750,
    y: canvas.height - 100,
    altura: 100,
    largura: 100,
    velocidade_x: 5
}

function desenharPersonagem () {
    ctx.fillStyle = 'white'
    ctx.fillRect(personagem.x, personagem.y, personagem.altura, personagem.largura)
}

function desenharObstaculo(){
    ctx.fillStyle = 'black'
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.altura, obstaculo.largura)
}

// Função para desenhar a pontuação na tela
function desenharPontuacao() {
    ctx.fillStyle = 'white'
    ctx.font = '20px Arial'
    ctx.fillText('Pontuação: ' + pontuacao, 20, 40)
    ctx.fillText('Máxima: ' + pontuacaoMaxima, canvas.width - 780, 100)
}

function atualizarObstaculo(){
    obstaculo.x -= obstaculo.velocidade_x
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width
        obstaculo.velocidade_x += 1
        pontuacao++ // Incrementar a pontuação quando o obstáculo "passar"
    }
}

function atualizarPersonagem () {
    if (personagem.pulando == true){
        personagem.velocidade_y -= gravidade
        personagem.y -= personagem.velocidade_y
        if (personagem.y >= canvas.height - 50) {
            personagem.velocidade_y = 0
            personagem.pulando = false
        }
    }
}

function verificaColisao(){
   if (obstaculo.x < personagem.x + personagem.largura &&
       obstaculo.largura + obstaculo.x > personagem.x &&
       personagem.y < obstaculo.y + obstaculo.altura &&
       personagem.y + personagem.altura > obstaculo.y) {
       obstaculo.velocidade_x = 0
       obstaculo.velocidade_y = 0
       ctx.fillStyle = 'Black'
       ctx.font = '50px Arial'
       ctx.fillText('GAME OVER', 300, 100)
       gameOver = true

       // Verificar se a pontuação atual é maior que a pontuação máxima
       if (pontuacao > pontuacaoMaxima) {
           pontuacaoMaxima = pontuacao
           localStorage.setItem('pontuacaoMaxima', pontuacaoMaxima) // Salvar a nova pontuação máxima
       }
   }
}

// Função loop para atualizar a tela
function loop () {
    if(gameOver == false){
        // Apagar a tela anterior
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Desenhar novamente
        desenharPersonagem()
        // Atualizar posições
        atualizarPersonagem()
        desenharObstaculo()
        atualizarObstaculo()
        desenharPontuacao() // Desenhar a pontuação na tela
        verificaColisao()
    }

    // Chamar o loop de novo
    requestAnimationFrame(loop)
}

loop()