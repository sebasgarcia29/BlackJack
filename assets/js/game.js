/* 

2C = Two of clubs (Treboles) 
2D = Two of Diamonds (Diamantes) 
2H = Two of Hearts (Corazones) 
2S = Two of Sword (Espadas) 

*/

(() => {
    'use strict'


    let deck = [];
    const typesDeck = ['C', 'D', 'H', 'S']
    const specialDecks = ['A', 'J', 'Q', 'K']

    let scorePlayer = 0, 
        scoreComputer = 0

    // References

    const btnRequest = document.querySelector('#btnRequest')
    const btnStop = document.querySelector('#btnStop')
    const btnNew = document.querySelector('#btnNew')

    const pointsHTML = document.querySelectorAll('small')

    const divCardsPlayer = document.querySelector('#player-cards')
    const divCardsComputer = document.querySelector('#computer-cards')


    // This function created new deck random
    const createDeck = () => {
        deck = []
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
        // console.log(deck)
        deck = _.shuffle(deck)
        return deck;
    }

    createDeck()

    // Selecte one card
    const requestCard = () => {
        if(deck.length === 0) {
            throw 'There are no cards in deck'
        }
        const card = deck.pop()
        return card
    }

    // const valueCard = (card) => {
    //     const value = card.substring(0, card.length - 1)
    //     let point = 0;
    //     if(isNaN(value)){
    //         point = (value === 'A') ? 11 : 10
    //     } else {
    //         point = Number(value);
    //     }
    // }
    const valueCard = (card) => {
        const value = card.substring(0, card.length - 1)
        return (isNaN(value)) ? 
            (value === 'A') ? 11 : 10
            : Number(value)
    }

    // Turn computer
    const turnComputer = (minimunPoinst) => {
        do {
            const card = requestCard()
            scoreComputer = scoreComputer + valueCard(card)
            pointsHTML[1].innerText = scoreComputer
        
            //Inset card
            const imgCard = document.createElement('img')
            imgCard.src = `assets/cards/${card}.png`
            imgCard.classList.add('card-blackJack')
            divCardsComputer.append(imgCard)

            if(scorePlayer > 21) break

            
        } while ((scoreComputer <  minimunPoinst) && (minimunPoinst <= 21));


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


    // Events

    // Function for create card
    btnRequest.addEventListener('click', () => {
        const card = requestCard()
        scorePlayer = scorePlayer + valueCard(card)
        pointsHTML[0].innerText = scorePlayer

        //Inset card
        const imgCard = document.createElement('img')
        imgCard.src = `assets/cards/${card}.png`
        imgCard.classList.add('card-blackJack')
        divCardsPlayer.append(imgCard)

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
        turnComputer(scorePlayer)
    })

    btnNew.addEventListener('click', () => {
        deck = createDeck()
        scorePlayer = 0
        scoreComputer = 0
        pointsHTML[0].innerText = 0
        pointsHTML[1].innerText = 0

        divCardsPlayer.innerHTML = ''
        divCardsComputer.innerHTML = ''

        btnRequest.disabled = false
        btnStop.disabled = false
    })


})()
