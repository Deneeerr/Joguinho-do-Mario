// Seleciona os elementos do jogo
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');
const enemy = document.createElement('img'); // Criando um inimigo dinamicamente
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');
let attacking = false; // Variável para controlar se o Mario está atacando

// Configurações do inimigo
enemy.src = 'assets/imgs/enemy.png'; // Define a imagem do inimigo
enemy.classList.add('enemy'); // Adiciona uma classe CSS ao inimigo
document.body.appendChild(enemy); // Adiciona o inimigo ao jogo

// Função que faz o Mario pular
const jump = () => {
    if (!attacking) { // Impede que pule enquanto ataca
        mario.classList.add('jump');
        setTimeout(() => mario.classList.remove('jump'), 500); // Remove a classe após 500ms
    }
};

// Função que ativa o ataque especial
const attack = () => {
    if (!attacking) {
        attacking = true; // Define que o Mario está atacando
        mario.src = 'assets/imgs/mario-attack.gif'; // Muda a imagem para a de ataque
        setTimeout(() => {
            mario.src = 'assets/imgs/mario.gif'; // Retorna à imagem normal após o ataque
            attacking = false;
        }, 500);
    }
};

// Loop para verificar colisões e derrotar inimigos
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft; // Posição do cano
    const enemyPosition = enemy.offsetLeft; // Posição do inimigo
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); // Posição vertical do Mario

    // Verifica colisão entre o Mario e o cano
    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        mario.src = 'assets/imgs/game-over.png';
        gameOver.style.visibility = 'visible';
        clearInterval(loop);
    }

    // Verifica se o ataque atingiu o inimigo
    if (attacking && enemyPosition <= 100 && enemyPosition > 0) {
        enemy.remove(); // Remove o inimigo ao ser atingido
    }
}, 10);

// Função para reiniciar o jogo
const restart = () => {
    gameOver.style.visibility = 'hidden';
    pipe.style.animation = 'pipe-animations 1.5s infinite linear';
    mario.src = 'assets/imgs/mario.gif';
    
    // Recria o inimigo ao reiniciar o jogo
    enemy.src = 'assets/imgs/enemy.png';
    document.body.appendChild(enemy);
};

// Eventos para controle de ações
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') jump(); // Barra de espaço para pular
    if (event.key === 'x') attack(); // Tecla 'X' para ataque
});

document.addEventListener('touchstart', jump);
restartButton.addEventListener('click', restart);
