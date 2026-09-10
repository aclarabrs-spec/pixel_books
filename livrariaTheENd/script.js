// ==========================================
// PIXEL BOOKS - JAVASCRIPT COMPLETO
// ==========================================


// ==========================================
// 1. ELEMENTOS DO HTML
// ==========================================

const startScreen = document.querySelector("#start-screen");
const startButton = document.querySelector("#start-button");
const game = document.querySelector("#game");

const room = document.querySelector("#room");
const player = document.querySelector("#player");
const cat = document.querySelector("#cat");

const interaction = document.querySelector("#interaction");

const bookMenu = document.querySelector("#book-menu");
const closeMenu = document.querySelector("#close-menu");

const bookGrid = document.querySelector(".book-grid");

const menuTitle = document.querySelector(".window h2");


// ==========================================
// 2. CATÁLOGO DA LIVRARIA
// ==========================================

const livros = {

    // ESTANTE DA ESQUERDA

    fantasia: [

        {
            titulo: "Coraline",
            autor: "neil Gaiman",
            preco: "R$ 49,90",
            capa: "img/livros/coraline.jpeg",
            link: "#"
        },

        {
            titulo: "o fantasma da opera",
            autor: "gaston Leroux",
            preco: "R$ 58,90",
            capa: "img/livros/ofantasmadaopera.jpg",
            link: "#"
        },

        {
            titulo: "o hobbit",
            autor: "j.r.r. Tolkien",
            preco: "R$ 89,90",
            capa: "img/livros/thehobbit.jpeg",
            link: "#"
        }

    ],


    // ESTANTE DO MEIO

    romance: [

        {
            titulo: "Vermelho, Branco e Sangue Azul",
            autor: "Casey McQuiston",
            preco: "R$ 29,90",
            capa: "img/livros/Vermelhobranco.jpeg",
            link: "#"
        },

        {
            titulo: "girls like girls",
            autor: "hayley Kiyoko",
            preco: "R$ 42,90",
            capa: "img/livros/girls.jpeg",
            link: "#"
        },

        {
            titulo: "os dois morrem no final",
            autor: "adam silvera",
            preco: "R$ 37,90",
            capa: "img/livros/osdois.jpeg",
            link: "#"
        }

    ],


    // ESTANTE DA DIREITA

    terror: [

        {
            titulo: "o masacre da familia hope",
            autor: "riley Sager",
            preco: "R$ 45,90",
            capa: "img/livros/omasacre.jpeg",
            link: "#"
        },

        {
            titulo: "o jantar secreto",
            autor: "raphael Montes",
            preco: "R$ 52,90",
            capa: "img/livros/ojantar.jpeg",
            link: "#"
        },

        {
            titulo: "it a coisa",
            autor: "stephen king",
            preco: "R$ 79,90",
            capa: "img/livros/it.jpeg",
            link: "#"
        }

    ]

};


// ==========================================
// 3. POSIÇÃO DO GATINHO
// ==========================================

let x = 480;
let y = 500;

const speed = 4;

let direction = "down";

let gameStarted = false;

let menuOpen = false;


// guarda qual estante está próxima

let estanteAtual = null;


// ==========================================
// 4. TECLAS
// ==========================================

const keys = {};


// quando aperta uma tecla

document.addEventListener("keydown", function(event) {

    const key = event.key.toLowerCase();

    keys[key] = true;


    // não deixa as setas moverem a página

    if (
        key === "arrowup" ||
        key === "arrowdown" ||
        key === "arrowleft" ||
        key === "arrowright"
    ) {

        event.preventDefault();

    }


    // ======================================
    // APERTAR E
    // ======================================

    if (
        key === "e" &&
        estanteAtual !== null &&
        !menuOpen
    ) {

        abrirEstante(estanteAtual);

    }


    // ======================================
    // ESC FECHA O MENU
    // ======================================

    if (
        key === "escape" &&
        menuOpen
    ) {

        fecharEstante();

    }

});


// quando solta a tecla

document.addEventListener("keyup", function(event) {

    keys[event.key.toLowerCase()] = false;

});


// ==========================================
// 5. COMEÇAR O JOGO
// ==========================================

startButton.addEventListener("click", function() {

    startScreen.classList.add("hidden");

    game.classList.remove("hidden");

    gameStarted = true;

    atualizarPersonagem();

});


// ==========================================
// 6. LOOP DO JOGO
// ==========================================

function gameLoop() {

    if (!gameStarted) {

        requestAnimationFrame(gameLoop);

        return;

    }


    // se o menu estiver aberto
    // o gato não pode andar

    if (menuOpen) {

        player.classList.remove("walking");

        requestAnimationFrame(gameLoop);

        return;

    }


    let moving = false;


    // CIMA

    if (
        keys["w"] ||
        keys["arrowup"]
    ) {

        y -= speed;

        direction = "up";

        moving = true;

    }


    // BAIXO

    if (
        keys["s"] ||
        keys["arrowdown"]
    ) {

        y += speed;

        direction = "down";

        moving = true;

    }


    // ESQUERDA

    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        x -= speed;

        direction = "left";

        moving = true;

    }


    // DIREITA

    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        x += speed;

        direction = "right";

        moving = true;

    }


    limitarMovimento();

    atualizarPersonagem();

    verificarEstante();


    // animação

    if (moving) {

        player.classList.add("walking");

    } else {

        player.classList.remove("walking");

    }


    requestAnimationFrame(gameLoop);

}


gameLoop();


// ==========================================
// 7. POSIÇÃO DO GATO
// ==========================================

function atualizarPersonagem() {

    player.style.left = x + "px";

    player.style.top = y + "px";


    // vira o gato

    if (direction === "left") {

        cat.style.transform = "scaleX(-1)";

    } else {

        cat.style.transform = "scaleX(1)";

    }

}


// ==========================================
// 8. LIMITES DA SALA
// ==========================================

function limitarMovimento() {

    const larguraGato = player.offsetWidth;
    const alturaGato = player.offsetHeight;


    // ESQUERDA

    if (x < 10) {

        x = 10;

    }


    // DIREITA

    if (
        x >
        room.clientWidth -
        larguraGato -
        10
    ) {

        x =
            room.clientWidth -
            larguraGato -
            10;

    }


    // CIMA

    if (y < 235) {

        y = 235;

    }


    // BAIXO

    if (
        y >
        room.clientHeight -
        alturaGato -
        10
    ) {

        y =
            room.clientHeight -
            alturaGato -
            10;

    }

}


// ==========================================
// 9. DESCOBRIR QUAL ESTANTE ESTÁ PERTO
// ==========================================

function verificarEstante() {

    estanteAtual = null;


    // gato ainda está longe das estantes

    if (y > 310) {

        interaction.style.display = "none";

        return;

    }


    const centroGato =
        x + player.offsetWidth / 2;


    const larguraSala =
        room.clientWidth;


    // ======================================
    // ESTANTE ESQUERDA
    // ======================================

    if (centroGato < larguraSala * 0.33) {

        estanteAtual = "fantasia";

        interaction.innerHTML =
            "E — VER FANTASIA";

    }


    // ======================================
    // ESTANTE DO MEIO
    // ======================================

    else if (
        centroGato <
        larguraSala * 0.67
    ) {

        estanteAtual = "romance";

        interaction.innerHTML =
            "E — VER ROMANCE";

    }


    // ======================================
    // ESTANTE DIREITA
    // ======================================

    else {

        estanteAtual = "terror";

        interaction.innerHTML =
            "E — VER TERROR";

    }


    interaction.style.display = "block";

}


// ==========================================
// 10. ABRIR ESTANTE
// ==========================================

function abrirEstante(categoria) {

    menuOpen = true;


    bookMenu.classList.remove("hidden");


    interaction.style.display = "none";


    player.classList.remove("walking");


    // título

    menuTitle.innerHTML =
        "✦ " +
        categoria.toUpperCase() +
        " ✦";


    // coloca os livros

    mostrarLivros(categoria);

}


// ==========================================
// 11. MOSTRAR LIVROS
// ==========================================

function mostrarLivros(categoria) {

    // limpa os livros antigos

    bookGrid.innerHTML = "";


    // pega os livros daquela categoria

    const lista =
        livros[categoria];


    // cria cada livro

    lista.forEach(function(livro) {


        const card =
            document.createElement("article");


        card.classList.add(
            "book-card"
        );


        card.innerHTML = `

            <img
                class="real-book-cover"
                src="${livro.capa}"
                alt="${livro.titulo}"
            >

            <h3>
                ${livro.titulo}
            </h3>

            <p>
                ${livro.autor}
            </p>

            <strong>
                ${livro.preco}
            </strong>

            <button
                class="buy-button"
                data-link="${livro.link}"
            >
                VER LIVRO
            </button>

        `;


        bookGrid.appendChild(card);

    });


    // ativa os botões

    ativarBotoes();

}


// ==========================================
// 12. BOTÕES DOS LIVROS
// ==========================================

function ativarBotoes() {

    const botoes =
        document.querySelectorAll(
            ".buy-button"
        );


    botoes.forEach(function(botao) {

        botao.addEventListener(
            "click",
            function() {


                const link =
                    botao.dataset.link;


                // só abre quando tiver
                // um link verdadeiro

                if (
                    link &&
                    link !== "#"
                ) {

                    window.open(
                        link,
                        "_blank"
                    );

                } else {

                    alert(
                        "Link do livro ainda não cadastrado!"
                    );

                }

            }
        );

    });

}


// ==========================================
// 13. FECHAR ESTANTE
// ==========================================

function fecharEstante() {

    menuOpen = false;


    bookMenu.classList.add(
        "hidden"
    );


    limparTeclas();

}


// botão X

closeMenu.addEventListener(
    "click",
    fecharEstante
);


// ==========================================
// 14. LIMPAR TECLAS
// ==========================================

function limparTeclas() {

    for (const key in keys) {

        keys[key] = false;

    }

}


// ==========================================
// 15. SE SAIR DA JANELA
// ==========================================

window.addEventListener(
    "blur",
    function() {

        limparTeclas();

        player.classList.remove(
            "walking"
        );

    }
);