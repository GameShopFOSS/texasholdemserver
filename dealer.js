const {Deck} = require('./deck.js');

class Dealer{
deck = new Deck();
//playerActions
//phase = "";//smallBlind, bigBlind
//positionReference = 0;
constructor(){
	
}
//shiftTable
//put in smallblind
//put in bigblind
getDeck() {

	return deck;
}

initializeDealerState(){

	var playerTurn = "0";
	//var bettingState = "smallblind";
	//var isBetting = "true";
	var playState = "smallblind"; //smallblind, bigblind, flop, dealflop, playflop, turn, playturn, river, playriver, showdown, scoring, finish
	//var 
	var lastPlayState = "none";

	return {playerTurn: playerTurn, playState: playState, lastPlayState: lastPlayState, turnElapsedTime: "0", currentBlind: "0"};

}

consumePlayerActions(data) {

		var gameRoom = data;
		var dfault = false;
		var currentTime = parseInt(gameRoom.dealerState.turnElapsedTime) + 1;
    	 if (currentTime > 30) {
//fold or choose dfault action
			dfault = true;
    	 }

    	 //fold, call, raise

//email: action : "bet", amount: 500
//playerData.push({email: data.email, firstname: data.firstname, chipsStocked: "0", chipsBlind: "0", cardsInHand : [], clockWisePositionFromButton: '' + i});


	if (data.dealerState.playState === "dealing"){
    	 
    	 gameRoom.dealerState.turnElapsedTime = 0;
    	 var burnedCardDeck = getDeck().dealCard(data.deck);

    	 // var firstDeal = getDeck().dealCard(burnedCardDeck.cards);
    	 // var firstCard = firstDeal.dealt;
    	 // var secondDeal = getDeck().dealCard(firstDeal.cards);
    	 // var secondCard = secondDeal.dealt;
    	 // var thirdDeal = getDeck().dealCard(secondDeal.cards);
    	 // var thirdCard = thirdDeal.dealt;
    	 // gameRoom.cardsInPlay = [firstCard, secondCard, thirdCard];
    	  gameRoom.deck = getDeck().dealCard(burnedCardDeck.cards);
    	 //deal player cards
    	 for (i = 0; i < 8; i++){
	  	 			//if (data.playerData[i].email === data.playerActions.email){
	  	 				var firstDealToPlayer = getDeck().dealCard(gameRoom.deck);
	  	 				var firstCardToPlayer = firstDealToPlayer.dealt;
	  	 				var secondDealToPlayer = getDeck().dealCard(firstDealToPlayer);
	  	 				var secondCardToPlayer = secondDealToPlayer.dealt;
	  	 				gameRoom.playerData[i].cardsInHand = [firstCardToPlayer,secondCardToPlayer];
	  	 			// gameRoom.playerData[i].chipsBlind = "" + 100;
	  	 			// gameRoom.dealerState.currentBlind = gameRoom.playerData[i].chipsBlind;
	  	 			//}
	  	 			gameRoom.deck = secondDealToPlayer.cards;
	  	 		}


    	 gameRoom.dealerState.playState = "preflop";
	  	 }


		if (data.dealerState.playState === "flop"){
    	 
    	 gameRoom.dealerState.turnElapsedTime = 0;
    	 var burnedCardDeck = getDeck().dealCard(data.deck);

    	 var firstDeal = getDeck().dealCard(burnedCardDeck.cards);
    	 var firstCard = firstDeal.dealt;
    	 var secondDeal = getDeck().dealCard(firstDeal.cards);
    	 var secondCard = secondDeal.dealt;
    	 var thirdDeal = getDeck().dealCard(secondDeal.cards);
    	 var thirdCard = thirdDeal.dealt;
    	 gameRoom.cardsInPlay = [firstCard, secondCard, thirdCard];
    	 gameRoom.deck = thirdDeal.cards;
    	 //deal player cards
    	 // for (i = 0, i < 8, i++){
	  	 	// 		//if (data.playerData[i].email === data.playerActions.email){
	  	 	// 			var firstDealToPlayer = getDeck().dealCard(gameRoom.deck);
	  	 	// 			var firstCardToPlayer = firstDealToPlayer.dealt;
	  	 	// 			var secondDealToPlayer = getDeck().dealCard(firstDealToPlayer);
	  	 	// 			var secondCardToPlayer = secondDealToPlayer.dealt;
	  	 	// 			gameRoom.playerData[i].cardsInHand = [firstCardToPlayer,secondCardToPlayer];
	  	 	// 		// gameRoom.playerData[i].chipsBlind = "" + 100;
	  	 	// 		// gameRoom.dealerState.currentBlind = gameRoom.playerData[i].chipsBlind;
	  	 	// 		//}
	  	 	// 		gameRoom.deck = secondDealToPlayer;
	  	 	// 	}


    	 gameRoom.dealerState.playState = "turn";
	  	 }

	  	 else if (data.dealerState.playState === "turn"){
    	gameRoom.dealerState.turnElapsedTime = 0;
    	 var burnedCardDeck = getDeck().dealCard(data.deck);

    	 var firstDeal = getDeck().dealCard(burnedCardDeck.cards);
    	 var firstCard = firstDeal.dealt;
    	  gameRoom.cardsInPlay.push(firstCard); //= [firstCard, secondCard, thirdCard];
    	 gameRoom.deck = firstDeal.cards;
gameRoom.dealerState.playState = "preriver";
	  	 }

	  	 else if (data.dealerState.playState === "river"){
    	gameRoom.dealerState.turnElapsedTime = 0;
    	 var burnedCardDeck = getDeck().dealCard(data.deck);

    	 var firstDeal = getDeck().dealCard(burnedCardDeck.cards);
    	 var firstCard = firstDeal.dealt;
    	  gameRoom.cardsInPlay.push(firstCard); //= [firstCard, secondCard, thirdCard];
    	 gameRoom.deck = firstDeal.cards;
gameRoom.dealerState.playState = "finalbet";
	  	 } else if (data.dealerState.playState === "showdown"){
    	 // 	if (dfault){

	  	 	// } else {
	  	 		
	  	 	// }
	  	 	var currentValue = 0;
	  	 	var winningPlayer = 0;
	  	 	var currentRank = {};
	  	 	for (i = 0; i < 8; i++){
	  	 		if (gameRoom.playerData[i].cardsInHand.length > 0){

	  	 			currentRank = addCardsAndRankThem(gameRoom.cardsInPlay, gameRoom.playerData[i].cardsInHand);
	  	 			if (currentRank.value > currentValue) {
	  	 				winningPlayer = i;
	  	 			}
	  	 		}
	  	 		
	  	 	}
	  	 	
    	 }


		if (!Array.isArray(data.playerActions)) {
	  	 if (data.dealerState.playState === "smallblind"){ 
	  	 	//bets, dfault bet
	  	 	if (dfault){
	  	 		// if(data.playerActions.length >0){

	  	 		// }
	  	 		//data.playerActions.action === 

	  	 		//for (i = 0, i < 8, i++){
	  	 		//	if (data.playerData[i].email === data.playerActions.email){
	  	 			gameRoom.playerData[0].chipsBlind = "" + 100;
	  	 			gameRoom.dealerState.currentBlind = gameRoom.playerData[0].chipsBlind;
	  	 		//	}
	  	 		//}
	  	 	} else {

			//for (i = 0, i < 8, i++){
	  	 			//if (data.playerData[i].email === data.playerActions.email){
	  	 			gameRoom.playerData[0].chipsBlind = "" + data.playerActions.amount;	
	  	 			gameRoom.dealerState.currentBlind = gameRoom.playerData[0].chipsBlind;
	  	 			//}
	  	 		//}
	  	 		// if (data.playerActions.action === "fold"){

	  	 		// }
	  	 	}

	  	 	gameRoom.dealerState.playState = "bigblind";

    	 } else if (data.dealerState.playState === "bigblind"){

    	 	if (dfault){
//for (i = 0, i < 8, i++){
	  	 		//	if (data.playerData[i].email === playerActions.email){
	  	 			gameRoom.playerData[1].chipsBlind = "" + (parseInt(gameRoom.dealerState.currentBlind) * 2);	
	  	 			gameRoom.dealerState.currentBlind = gameRoom.playerData[1].chipsBlind;
	  	 		//	}
	  	 		//}
	  	 	} else {
	  	 		//for (i = 0, i < 8, i++){
	  	 		gameRoom.playerData[1].chipsBlind =  "" + data.playerActions.amount;	
	  	 			gameRoom.dealerState.currentBlind = gameRoom.playerData[1].chipsBlind;
	  	 	}
	  	 	gameRoom.dealerState.playState = "dealing";
    	 }
    	  
    	 // else if (data.dealerState.playState === "dealflop"){
    	 // 	if (dfault){

	  	 	// } else {
	  	 		
	  	 	// }
    	 // } 
    	 	 else if (data.dealerState.playState === "preflop"){
    	 	
    	 	if (dfault){
//fold
		gameRoom.playerData[parseInt(data.dealerState.playerTurn)].cardsInHand = [];

	  	 	} else {
	  	 		if (data.playerActions.action === "fold"){
					gameRoom.playerData[parseInt(data.dealerState.playerTurn)].cardsInHand = [];
	  	 		} else if (data.playerActions.action === "bet") {
	  	 			gameRoom.playerData[data.dealerState.playerTurn].chipsBlind =  "" + data.playerActions.amount;	
	  	 			gameRoom.dealerState.currentBlind = gameRoom.playerData[data.dealerState.playerTurn].chipsBlind;
	  	 		}
	  	 	}
	  	 	if (parseInt(gameRoom.dealerState.playerTurn) == "7"){
    	 		gameRoom.dealerState.playState === "flop"
    	 	}
    	 }


    	 else if (data.dealerState.playState === "preturn"){
    	 	// if (parseInt(gameRoom.dealerState.playerTurn) == 0){
    	 	// 	gameRoom.dealerState.playState === "flop"
    	 	// }
    	 	if (dfault){
//fold
		gameRoom.playerData[parseInt(data.dealerState.playerTurn)].cardsInHand = [];

	  	 	} else {
	  	 		if (data.playerActions.action === "fold"){
					gameRoom.playerData[parseInt(data.dealerState.playerTurn)].cardsInHand = [];
	  	 		} else if (data.playerActions.action === "bet") {
	  	 			gameRoom.playerData[data.dealerState.playerTurn].chipsBlind =  "" + data.playerActions.amount;	
	  	 			gameRoom.dealerState.currentBlind = gameRoom.playerData[data.dealerState.playerTurn].chipsBlind;
	  	 		}
	  	 	}

	  	 	if (parseInt(gameRoom.dealerState.playerTurn) == "7"){
    	 		gameRoom.dealerState.playState === "turn"
    	 	}
    	 } 
    	 else if (data.dealerState.playState === "preriver"){
    	 	if (dfault){
//fold
		gameRoom.playerData[parseInt(data.dealerState.playerTurn)].cardsInHand = [];

	  	 	} else {
	  	 		if (data.playerActions.action === "fold"){
					gameRoom.playerData[parseInt(data.dealerState.playerTurn)].cardsInHand = [];
	  	 		} else if (data.playerActions.action === "bet") {
	  	 			gameRoom.playerData[data.dealerState.playerTurn].chipsBlind =  "" + data.playerActions.amount;	
	  	 			gameRoom.dealerState.currentBlind = gameRoom.playerData[data.dealerState.playerTurn].chipsBlind;
	  	 		}
	  	 	}

	  	 	if (parseInt(gameRoom.dealerState.playerTurn) == "7"){
    	 		gameRoom.dealerState.playState === "river"
    	 	}
    	 }  else if (data.dealerState.playState === "finalbet"){
    	 	if (dfault){
//fold
		gameRoom.playerData[parseInt(data.dealerState.playerTurn)].cardsInHand = [];

	  	 	} else {
	  	 		if (data.playerActions.action === "fold"){
					gameRoom.playerData[parseInt(data.dealerState.playerTurn)].cardsInHand = [];
	  	 		} else if (data.playerActions.action === "bet") {
	  	 			gameRoom.playerData[data.dealerState.playerTurn].chipsBlind =  "" + data.playerActions.amount;	
	  	 			gameRoom.dealerState.currentBlind = gameRoom.playerData[data.dealerState.playerTurn].chipsBlind;
	  	 		}
	  	 	}

	  	 	if (parseInt(gameRoom.dealerState.playerTurn) == "7"){
    	 		gameRoom.dealerState.playState === "showdown"
    	 	}
    	 }  

    	 else if (data.dealerState.playState === "scoring"){
    	 	if (dfault){

	  	 	} else {
	  	 		
	  	 	}
    	 } else if (data.dealerState.playState === "finish"){
    	 	if (dfault){

	  	 	} else {
	  	 		
	  	 	}
    	 } 

    	 if (parseInt(gameRoom.dealerState.playerTurn) < 7){
    		gameRoom.dealerState.playerTurn = "" +parseInt(gameRoom.dealerState.playerTurn) + 1;
    	} else {
    		gameRoom.dealerState.playerTurn = "0";
    	}
    	}

    	if(gameRoom.playerData[parseInt(gameRoom.dealerState.playerTurn)].cardsInHand.length == 0){
gameRoom.dealerState.playerTurn = "" +parseInt(gameRoom.dealerState.playerTurn) + 1;
    	}
    	
    	  gameRoom.dealerState.turnElapsedTime = (currentTime).ToString();
    	 gameRoom.playerActions = [];

    	 return gameRoom;
}
    	 // var currentTime = parseInt(gameRoom.dealerState.turnElapsedTime) + 1;
    	 // if (currentTime > 30){

    	 // }
    	
}


module.exports = {Dealer};
