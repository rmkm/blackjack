let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack",
    "Ten", "Nine", "Eight", "Seven", "Six",
    "Five", "Four", "Three", "Two", "One"];

let textArea = document.getElementById("text_area");
let newGameButton = document.getElementById("new_game_button");
let hitButton = document.getElementById("hit_button");
let stayButton = document.getElementById("stay_button");

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

function getCardString(card) {
    return card.value + " of " + card.suit;
}


hitButton.style.display = "none";
stayButton.style.display = "none";

newGameButton.addEventListener("click", function(){
    textArea.innerText = "Started...";
    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
})