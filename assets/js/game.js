/* 

2C = Two of clubs (Treboles) 
2D = Two of Diamonds (Diamantes) 
2H = Two of Hearts (Corazones) 
2S = Two of Sword (Espadas) 

*/

const myModule = (() => {
    'use strict'

    let deck = [];

    const typesDeck = ['C', 'D', 'H', 'S'], 
          specialDecks = ['A', 'J', 'Q', 'K'];

    let playerPoints = [];

    // References HTML

    const btnRequest = document.querySelector('#btnRequest'),
          btnStop = document.querySelector('#btnStop'),
          btnNew = document.querySelector('#btnNew');
      
    const divCardsPlayers = document.querySelectorAll('.divCards'),
          pointsHTML = document.querySelectorAll('small');

    // This function start game
    const initGame = (numPlayers = 2) => {
        deck = createDeck();
        playerPoints = []
        for(let i = 0; i < numPlayers; i++){
            playerPoints.push(0);
        }
        pointsHTML.forEach(elem => elem.innerText = 0)
        divCardsPlayers.forEach(elem => elem.innerHTML = '')
        btnRequest.disabled = false
        btnStop.disabled = false
    }

    // This function created new deck random
    const createDeck = () => {
        deck = [];
        for(let i = 2; i <= 10; i++){
            for (let typeCard of typesDeck) {
                deck.push(i + typeCard)
            }
        }
            for (let typeCard of typesDeck) {
                for (let specialDesk of specialDecks) {
                    deck.push(specialDesk + typeCard)
                }
            }
        return _.shuffle(deck);
    }

    // Selecte one card
    const requestCard = () => {
        if(deck.length === 0) throw 'There are no cards in deck'
        return deck.pop()
    }

    const valueCard = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ? 
            (value === 'A') ? 11 : 10
            : Number(value)
    }

    const collectPlayerPoints = (card, playerTurn) => {
        playerPoints[playerTurn] = playerPoints[playerTurn] + valueCard(card)
        pointsHTML[playerTurn].innerText = playerPoints[playerTurn]
        return playerPoints[playerTurn]
    }

    const createCard = (card, playerTurn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('card-blackJack');
        divCardsPlayers[playerTurn].append(imgCard);
    }

    const validateWinner = () => {

        const [minimunPoinst, scoreComputer] = playerPoints

        setTimeout(() => {
            if(scoreComputer === minimunPoinst){
                alert('Nadie gana :(');
            } else if(minimunPoinst > 21){
                alert('Computadora gana');
            } else if(scoreComputer > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 10);
    }

    // Turn computer
    const turnComputer = (minimunPoinst) => {
        let scoreComputer = 0
        do {
            const card = requestCard()
            scoreComputer = collectPlayerPoints(card, playerPoints.length - 1);
            createCard(card, playerPoints.length - 1)
        } while ((scoreComputer <  minimunPoinst) && (minimunPoinst <= 21));
        validateWinner()
    }


    // Events

    // Function for create card
    btnRequest.addEventListener('click', () => {
        const card = requestCard()
        const scorePlayer = collectPlayerPoints(card, 0);
        createCard(card, 0)
        if(scorePlayer > 21) {
            btnRequest.disabled = true
            btnStop.disabled = true
            turnComputer(scorePlayer)
        } else if(scorePlayer === 21 ){
            btnRequest.disabled = true
            btnStop.disabled = true
        }
    })

    //Function for stop the player game and start game the computer
    btnStop.addEventListener('click', () => {
        btnRequest.disabled = true
        btnStop.disabled = true
        turnComputer(playerPoints[0])
    })

    btnNew.addEventListener('click', () => {
        initGame()
    });

    return {
        newGame: initGame,
    }

})()
