
class Card{

rank = "Ace";
suit = "Spades";

// constructor(){
	
// }

constructor(suit, rank){

	this.suit = suit;
	this.rank = rank;
}

getCard(){

	return {suit: this.suit, rank: this.rank};
}
}

module.exports = {Card};