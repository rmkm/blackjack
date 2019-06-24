let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack",
    "Ten", "Nine", "Eight", "Seven", "Six",
    "Five", "Four", "Three", "Two"];

let textArea = document.getElementById("text_area");
let newGameButton = document.getElementById("new_game_button");
let hitButton = document.getElementById("hit_button");
let stayButton = document.getElementById("stay_button");

let gameStarted = false,
    gameOver = false,
    playerwon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

function createDeck(){
    let deck=[];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
           let card = {
               suit: suits[suitIdx],
               value: values[valueIdx]
           };
           deck.push(card);
        }
    }
    return deck;
}
function shuffleDeck(deck) {
    let j, tmp;
    for (let i = 0; i < deck.length; i++) {
        j = Math.trunc(Math.random() * deck.length);
        tmp = deck[j];
        deck[j] = deck[i];
        deck[i] = tmp;
    }
}

function getNextCard(deck) {
    return deck.shift();
}

function getCardString(card) {
    return card.value + " of " + card.suit;
}

function getCardNumericValue(card) {
    switch(card.value) {
        case "Ace":
            return 1;
        case "Two":
            return 2;
        case "Three":
            return 3;
        case "Four":
            return 4;
        case "Five":
            return 5;
        case "Six":
            return 6;
        case "Seven":
            return 7;
        case "Eight":
            return 8;
        case "Nine":
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {
    let card;
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        score += getCardNumericValue(cardArray[i]);
        if (cardArray[i].value === "Ace") {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Welcome to Blackjack !"
        return;
    }

    let dealerCardString = "";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardString = "";
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScores();

    textArea.innerText =
        "Dealer has:\n" +
        dealerCardString +
        "(score: " + dealerScore + ")\n\n" +

        "Player has:\n" +
        playerCardString +
        "(score: " + playerScore + ")\n\n\n";

    if (gameOver) {
        if (playerWon) {
            textArea.innerText += "YOU WIN !"
        } else {
            textArea.innerText += "DEALER WINS";
        }
        newGameButton.style.display = "inline";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    }
}

function checkForEndOfGame() {
    updateScores();
    if (gameOver) {
        while(dealerScore < playerScore
            && playerScore <= 21
            && dealerScore <= 21) {
                dealerCards.push(getNextCard(deck));
                updateScores();
            }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            playerWon = false;
        }
    }
}

hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

newGameButton.addEventListener("click", function(){
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [ getNextCard(deck), getNextCard(deck) ];
    playerCards = [ getNextCard(deck), getNextCard(deck) ];

    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    showStatus();
})

hitButton.addEventListener("click", function(){
    playerCards.push(getNextCard(deck));
    checkForEndOfGame();
    showStatus();
})

stayButton.addEventListener("click", function(){
    gameOver = true;
    checkForEndOfGame();
    showStatus();
})