const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//função para virar carta
/*
O Element.classList é uma propriedade somente leitura que 
retorna uma coleção DOMTokenList ativa dos atributos de classe 
do elemento.Usar classList é uma alternativa conveniente 
para acessar a lista de classes de um elemento como uma seqüência 
delimitada por espaço através de element.className.
Métodos
add( String [, String] )
Adicione valores de classe especificados. Se essas classes já existem no atributo do elemento, elas são ignoradas.
remove( String [,String] )
Remover valores de classe específicos.
item ( Number )
Retorna o valor da classe por índice na coleção.
toggle ( String [, force] )
Quando apenas um argumento está presente: Toggle class value; Ou seja, se a classe existir, em seguida, removê-lo e retornar false, se não, então adicioná-lo e retornar true.
Quando um segundo argumento está presente: Se o segundo argumento é avaliado como true, adicione o valor especificado da classe e, se ele for avaliado como false, remova-o.
contains( String )
Verifica
 se o valor da classe especificado existe no atributo de classe do elemento.
*/
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;



    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
        ///card.style.order ordem que os elementos aparecem no flexcontainer
    })
})();

/// esta funcao eh renderizada toda vez que o codigo começa a rodar 
/// ela é uma imediatle invoked function e toda vez que ela eh chamada

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});