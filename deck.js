
const {Card} = require('./card.js');
//var dealer = new Dealer();
class Deck{

//cards = [];
constructor(){
//instantiateDeck();

}

addCardsAndRankThem(cardsInPlay, hand){
var startingRank = rankCardsInPlay(cardsInPlay);

	resultCards = cardsInPlay;
	for (i = 0; i < cardsInPlay.length; i++){

		if (hand[0].suit == cardsInPlay[i].suit){
			if(cardRankResolverToValue(hand[0].rank) > cardRankResolverToValue(cardsInPlay[i].rank)){
				resultCards[i] = cardsInPlay[i]
				continue;
			}

		}
if (hand[1].suit == cardsInPlay[i].suit){
			if(cardRankResolverToValue(hand[1].rank) > cardRankResolverToValue(cardsInPlay[i].rank)){
				resultCards[i] = cardsInPlay[i]
			}

		}
	}	

	var resultRank = rankCardsInPlay(cardsInPlay);
	if (resultRank.value > startingRank.value){
		return resultRank;
	}
	return startingRank;
}
rankCardsInPlay(cardsInPlay){
	var result = {};
	// for(i = 0, i < 5, i++){
	// 	//cardsInPlay[i]
	// }

	//var rank = 0;

	var cards = orderPlayedCards(cardsInPlay);

	//royalflush
	if (cards[0].rank === "Ace" && cards[1].rank === "King" && cards[2].rank === "Queen" && cards[3].rank === "Jack" && cards[4].rank === "10"){
		return result = {rating: "Royal Flush", value: 10};
	}

	for (i = 0; i < cards.length - 1; i++){

		if (cards[i].suit != cards[i+1].suit){
			break;
		}

		if ((cardRankResolverToValue(cards[i].rank) - cardRankResolverToValue(cards[i+1].rank)) != 1){
			break;
		}

		return result = {rating: "Straight Flush", value: 9};
	}
	var match = 0;
	for (i = 0; i < cards.length - 1; i++){

		// if (cards[i].suit != cards[i+1].suit){
		// 	break;
		// }
		
		if (cards[i].rank == cards[i+1].rank){
			match++;
		}
		if (match == 4){
			return result = {rating: "Four of a Kind", value: 8};
		}
		
	}
	 match = 0;
	for (i = 0; i < cards.length - 1; i++){

		// if (cards[i].suit != cards[i+1].suit){
		// 	break;
		// }
		
		if (cards[i].rank == cards[i+1].rank){
			match++;
		}
		if (match == 3){
			match = 0;
		}
		if (cards[i].rank == cards[i+1].rank){
			match++;
		}
		if (match == 2){
		return result = {rating: "Full House", value: 7};	
		}
			//return result = {rating: "Four of a Kind", value: 8};
	}

	for (i = 0; i < cards.length - 1; i++){
		if (cards[i].suit != cards[i+1].suit){
			break;
		}
		return result = {rating: "Flush", value: 6};	
	}

	for (i = 0; i < cards.length - 1; i++){
		

		if ((cardRankResolverToValue(cards[i].rank) - cardRankResolverToValue(cards[i+1].rank)) != 1){
			break;
		}
		return result = {rating: "Straight", value: 5};	
	}

if(cards[0].rank == "Ace"){

for (i = 4; i > 1; i--) {

		if ((cardRankResolverToValue(cards[i-1].rank) - cardRankResolverToValue(cards[i].rank)) != 1){
			break;
		}
		return result = {rating: "Straight", value: 5};	
	}
		}
		 match = 0;
for (i = 0; i < cards.length - 1; i++){

		// if (cards[i].suit != cards[i+1].suit){
		// 	break;
		// }
		
		if (cards[i].rank == cards[i+1].rank){
			match++;
		}
		if (match == 3){
			return result = {rating: "Three of a Kind", value: 4};
		}
		
	}
	 match = 0;
	for (i = 0; i < cards.length - 1; i++){

		// if (cards[i].suit != cards[i+1].suit){
		// 	break;
		// }
		
		if (cards[i].rank == cards[i+1].rank){
			match++;
		}
		if (match == 2){
			match = 0;
		//	return result = {rating: "Three of a Kind", value: 4};
		}
		if (cards[i].rank == cards[i+1].rank){
			match++;
		}
		if (match == 2){
			match = 0;
			return result = {rating: "Two Pair", value: 3};
		}
	}
 match = 0;
	for (i = 0; i < cards.length - 1; i++){

		// if (cards[i].suit != cards[i+1].suit){
		// 	break;
		// }
		
		
		if (cards[i].rank == cards[i+1].rank){
			match++;
		}
		if (match == 2){
			match = 0;
			return result = {rating: "One Pair", value: 2};
		}
	}
}
cardValueResolverToRank(value){
	var cardRank = "Ace";

	if (value < 11){
		cardRank = "" + value;
	} else if (value === 11){
		cardRank = "Jack";
	}else if (value === 12){
		cardRank = "Queen";
	}else if (value === 13){
		cardRank = "King";
	}else if (value === 14){
		cardRank ="Ace";
	}

	return cardRank;
}
cardRankResolverToValue(card){

	var cardRank = 0;
	if (card.rank === "Jack"){
		cardRank = 11;
	} else if (card.rank === "Queen") {
		cardRank == 12;
	} else if (card.rank === "King") {
		cardRank == 13;
	} else if (card.rank === "Ace") {
		cardRank == 14;
	}  else {
		cardRank = parseInt(card.rank);
	}
return cardRank;
}
orderPlayedCards(cardsInPlay){
	result = [];
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "Ace"){
			result.push(cardsInPlay[i]);
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "King"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "Queen"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "Jack"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "10"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "9"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "8"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "7"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "6"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "5"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "4"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "3"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "2"){
			result.push(cardsInPlay[i])
		}
	}
	for(i = 0; i < 5; i++){
		//cardsInPlay[i]
		if(cardsInPlay[i].rank === "1"){
			result.push(cardsInPlay[i])
		}
	}
	return result;
}

instantiateDeck(){

var cards = [];
cards.push(new Card("Ace", "Spades").getCard());
cards.push(new Card("2", "Spades").getCard());
cards.push(new Card("3", "Spades").getCard());
cards.push(new Card("4", "Spades").getCard());
cards.push(new Card("5", "Spades").getCard());
cards.push(new Card("6", "Spades").getCard());
cards.push(new Card("7", "Spades").getCard());
cards.push(new Card("8", "Spades").getCard());
cards.push(new Card("9", "Spades").getCard());
cards.push(new Card("10", "Spades").getCard());
cards.push(new Card("Jack", "Spades").getCard());
cards.push(new Card("Queen", "Spades").getCard());
cards.push(new Card("King", "Spades").getCard());


cards.push(new Card("Ace", "Clubs").getCard());
cards.push(new Card("2", "Clubs").getCard());
cards.push(new Card("3", "Clubs").getCard());
cards.push(new Card("4", "Clubs").getCard());
cards.push(new Card("5", "Clubs").getCard());
cards.push(new Card("6", "Clubs").getCard());
cards.push(new Card("7", "Clubs").getCard());
cards.push(new Card("8", "Clubs").getCard());
cards.push(new Card("9", "Clubs").getCard());
cards.push(new Card("10", "Clubs").getCard());
cards.push(new Card("Jack", "Clubs").getCard());
cards.push(new Card("Queen", "Clubs").getCard());
cards.push(new Card("King", "Clubs").getCard());

cards.push(new Card("Ace", "Hearts").getCard());
cards.push(new Card("2", "Hearts").getCard());
cards.push(new Card("3", "Hearts").getCard());
cards.push(new Card("4", "Hearts").getCard());
cards.push(new Card("5", "Hearts").getCard());
cards.push(new Card("6", "Hearts").getCard());
cards.push(new Card("7", "Hearts").getCard());
cards.push(new Card("8", "Hearts").getCard());
cards.push(new Card("9", "Hearts").getCard());
cards.push(new Card("10", "Hearts").getCard());
cards.push(new Card("Jack", "Hearts").getCard());
cards.push(new Card("Queen", "Hearts").getCard());
cards.push(new Card("King", "Hearts").getCard());

cards.push(new Card("Ace", "Diamonds").getCard());
cards.push(new Card("2", "Diamonds").getCard());
cards.push(new Card("3", "Diamonds").getCard());
cards.push(new Card("4", "Diamonds").getCard());
cards.push(new Card("5", "Diamonds").getCard());
cards.push(new Card("6", "Diamonds").getCard());
cards.push(new Card("7", "Diamonds").getCard());
cards.push(new Card("8", "Diamonds").getCard());
cards.push(new Card("9", "Diamonds").getCard());
cards.push(new Card("10", "Diamonds").getCard());
cards.push(new Card("Jack", "Diamonds").getCard());
cards.push(new Card("Queen", "Diamonds").getCard());
cards.push(new Card("King", "Diamonds").getCard());
var cardDeck = [];
// for (i = 0; i = cards.length; i++){
// cardDeck.push(cards[i].getCard());
// }

return cardDeck;
}

shuffle(deck){
var cards = [];
for (i = 0; i < 100; i++){

	cards = this.shuffleTwoCards(deck);
}

return cards;
} 

shuffleTwoCards(deck){
	var cards = deck;
var firstRandom =  Math.floor(Math.random() * cards.length);
var secondRandom =  differentRandom(Math.floor(Math.random() * cards.length));
var firstCopyCard = new Card(cards[firstRandom].rank, cards[firstRandom].suit).getCard();
var secondCopyCard = new Card(cards[secondRandom].rank, cards[secondRandom].suit).getCard();

	//if (firstRandom < secondRandom){
		cards.splice(firstRandom, 1);
		cards.push(firstCopyCard);
		cards.splice(secondRandom, 1);
		cards.push(secondCopyCard);
		
	//} else {

	//}
	return cards;
}

removeCardFromPlay(deck, rank, suit) {
 var cards = deck;

 for(i = 0; i < cards.length; i++){
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
var firstCopyCard = new Card(cards[firstRandom].rank, cards[firstRandom].suit).getCard();
cards.splice(firstRandom, 1);

return {cards: cards, dealt: firstCopyCard};
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