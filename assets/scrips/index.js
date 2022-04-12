const deckMaps = {
    suits: ["♣","♦","♥","♠"],
    ranks: ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
}

/**
 * Returns a new array with all combinatios for elements in two provided arrays
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @param {int = 0} idxArr1 
 * @param {int = 0} idxArr2 
 * @param {Array = []} array  
 * @returns Array
 */
function combinations(arr1, arr2, idxArr1=0, idxArr2=0, array=[]) {
    if ( arr1[idxArr1] && arr2[idxArr2] ) {
        array.push([
            arr1[idxArr1], arr2[idxArr2]
        ]);
        combinations(arr1, arr2, idxArr1, idxArr2+1, array)
    }
    else if ( ! arr2[idxArr2] ) combinations(arr1, arr2, idxArr1+1, 0, array);
    return array;
}

function combinationsIdx(arr1, arr2, idxArr1=0, idxArr2=0, array=[]) {
    if ( arr1[idxArr1] && arr2[idxArr2] ) {
        array.push([idxArr1, idxArr2]);
        combinationsIdx(arr1, arr2, idxArr1, idxArr2+1, array)
    }
    else if ( ! arr2[idxArr2] ) combinationsIdx(arr1, arr2, idxArr1+1, 0, array);
    return array;
}


/**
 * Return a random int smaller than provided.
 * @param {*} int 
 * @returns int
 */
function randomIntSmallerThan(int) {
    return Math.floor(Math.random()*int);
}

/**
 * Return a random index for a provided array
 * @param {Array} array 
 * @returns int
 */
function randomArrayIdx(array) {
    return randomIntSmallerThan(array.length);
}

/**
 * Returns a random element from provided array
 * @param {Array} array 
 * @returns *
 */
function randomArrayElement(array) {
    return array[randomArrayIdx(array)];
}

/**
 * Middleware for updating DOM elements
 */
class Card {
    constructor(suit, rank){
        this.HTMLSuit = document.querySelectorAll("span.suit");
        this.HTMLrank = document.querySelector("span#rank");
        this._suit = suit;
        this._rank = rank;

        for (let item of this.HTMLSuit) {
            item.innerText = deckMaps.suits[this._suit]
        }
        //this.HTMLSuit.innerText = deckMaps.suits[this._suit]
        this.HTMLrank.innerText = deckMaps.ranks[this._rank]
    }
    set suit(suit) {
        this._suit = suit;
        for (let item of this.HTMLSuit) item.innerText = deckMaps.suits[this._suit]
    }
    set rank(rank) {
        this._rank = rank;
        this.HTMLrank.innerText = deckMaps.ranks[this._rank]
    }
    setCard(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
}

/**
 * Update Card instance with random data from deck array
 * @param {Array} deck 
 * @param {Card} card 
 */
function getCardFromDeck(deck,card){
    card.setCard(...randomArrayElement(deck));
}

/**
 * Update rank for Card instance with random rank from ranks array.
 * @param {Array} ranks 
 * @param {Card} card 
 */
function getCardFromSameClub(ranks,card){
    card.rank = randomArrayIdx(ranks);
}

/**
 * Update Card instance with item from cardPile array and move it to discardPile array.
 * When cardPile is empty, recover dicardPiles contents.
 * @param {Array} cardsPile 
 * @param {Array} discartPile 
 * @param {Card} card 
 */
function getCardAndDiscartIt(cardsPile,discartPile,card){
    if ( cardsPile.length === 0 ) {
        cardsPile.push(...discartPile.splice(0,discartPile.length));
        window.alert('Recovering cards in discard pile.')
    }
    const newCardIdx = randomArrayIdx(cardsPile);
    card.setCard(...cardsPile[newCardIdx]);
    discartPile.push(...cardsPile.splice(newCardIdx,1));
}

/**
 * Start
 */
function main () {
    const deck = combinationsIdx(deckMaps.suits,deckMaps.ranks);
    const cardsPile = [...deck]
    const discartPile = [];
    const card = new Card(...randomArrayElement(deck));
    document.querySelector("button#newRandomCard")
        .addEventListener("click",()=>getCardFromDeck(deck,card));
    document.querySelector("button#newCardSameClub")
        .addEventListener("click",()=>getCardFromSameClub(deckMaps.ranks,card));
    document.querySelector("button#newCardAndDiscartIt")
        .addEventListener("click",()=>getCardAndDiscartIt(cardsPile,discartPile,card));
}

window.addEventListener("load",main);