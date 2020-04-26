
const {Card} = require('./card.js');
//var dealer = new Dealer();
class Deck{

//cards = [];
constructor(){
//instantiateDeck();

}

instantiateDeck(){

var cards = [];
cards.push(new Card("Ace", "Spades"));
cards.push(new Card("2", "Spades"));
cards.push(new Card("3", "Spades"));
cards.push(new Card("4", "Spades"));
cards.push(new Card("5", "Spades"));
cards.push(new Card("6", "Spades"));
cards.push(new Card("7", "Spades"));
cards.push(new Card("8", "Spades"));
cards.push(new Card("9", "Spades"));
cards.push(new Card("10", "Spades"));
cards.push(new Card("Jack", "Spades"));
cards.push(new Card("Queen", "Spades"));
cards.push(new Card("King", "Spades"));


cards.push(new Card("Ace", "Clubs"));
cards.push(new Card("2", "Clubs"));
cards.push(new Card("3", "Clubs"));
cards.push(new Card("4", "Clubs"));
cards.push(new Card("5", "Clubs"));
cards.push(new Card("6", "Clubs"));
cards.push(new Card("7", "Clubs"));
cards.push(new Card("8", "Clubs"));
cards.push(new Card("9", "Clubs"));
cards.push(new Card("10", "Clubs"));
cards.push(new Card("Jack", "Clubs"));
cards.push(new Card("Queen", "Clubs"));
cards.push(new Card("King", "Clubs"));

cards.push(new Card("Ace", "Hearts"));
cards.push(new Card("2", "Hearts"));
cards.push(new Card("3", "Hearts"));
cards.push(new Card("4", "Hearts"));
cards.push(new Card("5", "Hearts"));
cards.push(new Card("6", "Hearts"));
cards.push(new Card("7", "Hearts"));
cards.push(new Card("8", "Hearts"));
cards.push(new Card("9", "Hearts"));
cards.push(new Card("10", "Hearts"));
cards.push(new Card("Jack", "Hearts"));
cards.push(new Card("Queen", "Hearts"));
cards.push(new Card("King", "Hearts"));

cards.push(new Card("Ace", "Diamonds"));
cards.push(new Card("2", "Diamonds"));
cards.push(new Card("3", "Diamonds"));
cards.push(new Card("4", "Diamonds"));
cards.push(new Card("5", "Diamonds"));
cards.push(new Card("6", "Diamonds"));
cards.push(new Card("7", "Diamonds"));
cards.push(new Card("8", "Diamonds"));
cards.push(new Card("9", "Diamonds"));
cards.push(new Card("10", "Diamonds"));
cards.push(new Card("Jack", "Diamonds"));
cards.push(new Card("Queen", "Diamonds"));
cards.push(new Card("King", "Diamonds"));
var cardDeck = [];
for (i = 0; i = cards.length, i++){
cardDeck.push(cards[i].getCard());
}

return cardDeck;
}

shuffle(deck){
var cards = [];
for (i = 0; i < 100; i++){

	cards = shuffleTwoCards(deck);
}

return cards;
} 

shuffleTwoCards(deck){
	var cards = deck;
var firstRandom =  Math.floor(Math.random() * cards.length);
var secondRandom =  differentRandom(Math.floor(Math.random() * cards.length);
var firstCopyCard = new Card(cards[firstRandom].rank, cards[firstRandom].suit);
var secondCopyCard = new Card(cards[secondRandom].rank, cards[secondRandom].suit);

	//if (firstRandom < secondRandom){
		cards.splice(firstRandom, 1);
		cards.push(firstCopyCard.getCard());
		cards.splice(secondRandom, 1);
		cards.push(secondCopyCard.getCard());
		
	//} else {

	//}
	return cards;
}

removeCardFromPlay(deck, rank, suit) {
 var cards = deck;

 for(i = 0; i < cards.length, i++){
 	if(cards[i].rank === rank){

 		if (cards[i].suit === suit){
 			cards.splice(i, 1);
 		}
 	}
 }
 return cards;

}

dealCard(deck) {

	var cards = deck;
var firstRandom =  Math.floor(Math.random() * cards.length);
//var secondRandom =  differentRandom(Math.floor(Math.random() * cards.length);
var firstCopyCard = new Card(cards[firstRandom].rank, cards[firstRandom].suit);
cards.splice(firstRandom, 1);

return {cards: cards, dealt: firstCopyCard.getCard()};
}


differentRandom(amount){

var trial = Math.floor(Math.random() * cards.length);
if (trial === amount){
	return differentRandom(amount);
}
 return trial;
}

}

module.exports = {Deck};