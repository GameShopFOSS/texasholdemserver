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

	return {playerTurn: playerTurn, playState: playState, lastPlayState: lastPlayState, turnElapsedTime: "0"};

}

consumePlayerActions(data){

		var gameRoom = data;
		var default = false;
		var currentTime = parseInt(gameRoom.dealerState.turnElapsedTime) + 1;
    	 if (currentTime > 30) {
//fold or choose default action
			default = true;
    	 }

    	 //fold, call, raise

//email: action : "bet", amount: 500
	  	 if (data.dealerState.playState === "smallblind"){ 
	  	 	//bets, default bet
	  	 	if (default){
	  	 		// if(data.playerActions.length >0){

	  	 		// }
	  	 		//data.playerActions.action === 

	  	 		
	  	 	} else {

			for (i = 0, i < 8, i++){
	  	 			if (data.playerData[i].email === playerActions.email){
	  	 			data.playerData[i].chipsBlind = "" + playerActions.amount;	
	  	 			}
	  	 		}
	  	 		// if (data.playerActions.action === "fold"){

	  	 		// }
	  	 	}
    	 } else if (data.dealerState.playState === "bigblind"){

    	 	if (default){

	  	 	} else {
	  	 		
	  	 	}
    	 } else if (data.dealerState.playState === "flop"){
    	 	if (default){

	  	 	} else {
	  	 		
	  	 	}
    	 } else if (data.dealerState.playState === "dealflop"){
    	 	if (default){

	  	 	} else {
	  	 		
	  	 	}
    	 } else if (data.dealerState.playState === "playflop"){
    	 	if (default){

	  	 	} else {
	  	 		
	  	 	}
    	 } else if (data.dealerState.playState === "playturn"){
    	 	if (default){

	  	 	} else {
	  	 		
	  	 	}
    	 } else if (data.dealerState.playState === "river"){
    	 	if (default){

	  	 	} else {
	  	 		
	  	 	}
    	 } else if (data.dealerState.playState === "playriver"){
    	 	if (default){

	  	 	} else {
	  	 		
	  	 	}
    	 } else if (data.dealerState.playState === "showdown"){
    	 	if (default){

	  	 	} else {
	  	 		
	  	 	}
    	 } else if (data.dealerState.playState === "scoring"){
    	 	if (default){

	  	 	} else {
	  	 		
	  	 	}
    	 } else if (data.dealerState.playState === "finish"){
    	 	if (default){

	  	 	} else {
	  	 		
	  	 	}
    	 } 

    	 // var currentTime = parseInt(gameRoom.dealerState.turnElapsedTime) + 1;
    	 // if (currentTime > 30){

    	 // }
    	 gameRoom.dealerState.turnElapsedTime = (currentTime).ToString();
}
}

module.exports = {Dealer};