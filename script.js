//SITEMA DE PONTUAÇÃO

//MOSTRAR PONTUAÇÃO NA TELA
//ARMAZENAR VLOAR DA PONTUAÇÃO MAXIMA



//pegar o elemento canvas pelo id
const canvas = document.getElementById('jogoCanvas')
//inicializar o canvas
const ctx = canvas.getContext('2d')
const gravidade = 0.5
let gameOver = false
document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulando==false) {
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
    ctx.fillRect(
        personagem.x,
         personagem.y, 
         personagem.altura,
          personagem.largura)
}
function desenharObstaculo(){
    ctx.fillStyle = 'black'
    ctx.fillRect(
        obstaculo.x,
         obstaculo.y, 
         obstaculo.altura, 
         obstaculo.largura)
}

function atualizarObstaculo(){
    obstaculo.x -= obstaculo.velocidade_x
    if( obstaculo.x <= 0-obstaculo.largura){
        obstaculo.x = canvas.width
        obstaculo.velocidade_x += 1
    }
}

function atualizarPersonagem () {
    if (personagem.pulando == true){
        personagem.velocidade_y -= gravidade
        personagem.y -= personagem.velocidade_y
        if (personagem.y >= canvas.height-50){
            personagem.velocidade_y = 0
            personagem.pulando = false
        }
    }
}
function verificaColisao(){
   if( obstaculo.x < personagem.x + personagem.largura &&
    obstaculo.largura + obstaculo.x > personagem.x &&
    personagem.y < obstaculo.y + obstaculo.altura &&
    personagem.y + personagem.altura > obstaculo.y
){
       obstaculo.velocidade_x = 0
       obstaculo.velocidade_y = 0
       ctx.fillStyle = 'Black'
       ctx.font = '50px Arial'
       ctx.fillText('GAME OVER', 50, 100)
       gameOver = true
   }
}
//criar a função loop
function loop () {
    if(gameOver == false){

        //apagar a tela anterior 
        ctx.clearRect(0,0,canvas.width,canvas.height)
        //desenhar novamente
        desenharPersonagem()
        //atualizar posições
        atualizarPersonagem()
        desenharObstaculo()
        atualizarObstaculo()
        verificaColisao()
    }
    //chamar o loop denovo
    requestAnimationFrame(loop)
}
loop()