const express = require('express')
const app = express()
const {MongoClient} = require('mongodb');
var bodyParser = require('body-parser');

//const http = require('http');
const {EncryptionService} = require('./encryption-service.js');
var encryptionService = new EncryptionService();
var canConnect = false;
const {Dealer} = require('./dealer.js');
//var dealer = new Dealer();

const hostname = '127.0.0.1';
const port = 8080;
const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

async function verifyEmail(email){
	 const db = await client.db('game');
	 const collection = await db.collection('userData');
	var emailAddress =  await collection.find({email: '' + email}, { projection: { _id: 0, email: 1 } }).toArray();//, (err, item) => {

console.log(emailAddress);
   console.log(emailAddress.length);
	 if (emailAddress.length > 0){
	 	return true;
	 }

return false;
 
};

async function getLobbyQueueState(req){
	 const db = await client.db('game');
	 const collection = await db.collection('lobbyQueueData');
	var gameData =  await collection.find({roomId: '' + req.roomId}, { projection: { _id: 0, players: 1 } }).toArray();//, (err, item) => {

		var result = {gameData: gameData};
		return result;
// console.log(emailAddress);
//    console.log(emailAddress.length);
// 	 if (emailAddress.length > 0){
// 	 	return true;
// 	 }

// return false;
 
};

 
async function getGameRoomState(req){
	 const db = await client.db('game');
	 const collection = await db.collection('gameRoomData');
	var gameData =  await collection.find({roomId: '' + req.roomId}, { projection: { _id: 0, players: 1,
 	
 	cardsInPlay: 1,
 	dealerState: 1
  } }).toArray();//, (err, item) => {
var result = {gameData: gameData};
		return result;
// console.log(emailAddress);
//    console.log(emailAddress.length);
// 	 if (emailAddress.length > 0){
// 	 	return true;
// 	 }

// return false;
 
};

async function attemptToSignUp(requestBody, vipLevel){
  //  databasesList = await client.db().admin().listDatabases();
	var chips = "0";
	var hasReceivedTierBonus = "false";
    var hasReceivedPurchaseBonus = "false";
    var giftValuesOrMerchandiseAmount = "0";

    if (vipLevel === "None") {
    	chips = "6000";
	 hasReceivedTierBonus = "false";
     hasReceivedPurchaseBonus = "false";
     giftValuesOrMerchandiseAmount = "0";
    }

  const db = await client.db('game');
  try{
  const collection = await db.collection('userData');
   await collection.insertOne(
 	{email: '' + requestBody.email,
 	  firstname: '' + requestBody.firstname,
	lastname:'' + requestBody.lastname,
	password: '' +requestBody.password,
	cardNumber: '' +requestBody.cardNumber,
	cardDate: '' +requestBody.cardDate,
	cardCVV: '' + requestBody.cardCVV,
	chips:  '' + chips,
	 hasReceivedTierBonus:  '' + hasReceivedTierBonus,
     hasReceivedPurchaseBonus:  '' + hasReceivedPurchaseBonus,
     giftValuesOrMerchandiseAmount: '' + giftValuesOrMerchandiseAmount,
     loggedIn: 'true',
     disconnected: 'false',
     lastUpdate: '0',
     gameScene: "MainMenu"

}, (err, res) => {
    if (err) throw err;
    console.log("1 document inserted");
    //db.close();
  });

   //console.log(resultOfInsert);
} catch(e) {
	console.log(e);

	return false;
}
return true;

};


async function logPlayerOut(requestBody){
   try {
        // Connect to the MongoDB cluster
        //await client.connect();
 		const db = await client.db('game');
	 const collection = await db.collection('userData');
     

	var myquery = { email: '' + requestBody.email, password: '' + requestBody.password};
  var newvalues = {$set: {disconnected: "false", loggedIn: "false", lastUpdate: "0" } };
  await collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    
  });

   


 // }
//}
    } catch (e) {
        console.error(e);
    } 

    // finally {
    //     await client.close();
    // }

};
async function updateConnectionPoll(requestBody){
	var result = {response: "none"};
    try {
        // Connect to the MongoDB cluster
        //await client.connect();
 		const db = await client.db('game');
	 const collection = await db.collection('userData');
     

	//var values =  await collection.find({email: '' + requestBody.email, password: '' + requestBody.password}, { projection: { _id: 0, email: 1, password: 1 } }).toArray();//, (err, item) => {
 //if (data.lastUpdate > 10){
   	console.log(requestBody.email);
   	console.log(requestBody.password);
  // await collection.find().forEach(function(data) {

   //if (data.lastUpdate > 10){
   	console.log(requestBody.email);
   	console.log(requestBody.password);
	var myquery = { email: requestBody.email, password: requestBody.password};
  var newvalues = {$set: {disconnected: "false", loggedIn: "true", lastUpdate: "0" } };
  await collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(requestBody.email + " refreshed");
  
    //db.close();
  });
   //return data.game
     //result = {chips: data.chips, gameScene: data.gameScene};
  // });


	result = await collection.find({email: requestBody.email, password: requestBody.password}, { projection: { _id: 0, gameScene: 1, chips: 1 } }).toArray();//, (err, item) => {
	
    } catch (e) {
        console.error(e);
    } 
    return result;
    // finally {
    //     await client.close();
    // }
};
async function populateOnlineList(){
//const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	//const client = new MongoClient(uri);
	var result = {response: "none"};
    try {
   const db = await client.db('game');
	 const collection = await db.collection('userData');


	result = await collection.find({gameScene: "Lobby", loggedIn: "true", disconnected: "false"}, { projection: { _id: 0, firstname: 1, lastname: 1, email: 1 } }).toArray();//, (err, item) => {
	
    } catch (e) {
        console.error(e);
    } 
    return result;
    // finally {
    //     await client.close();
    // }
};
async function populateQueuesandGameRooms(){
//const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	//const client = new MongoClient(uri);
	var result = {response: "none"};
	var lobbyQueue = {queues: "none"};
	var gameRooms = {rooms: "none"};
    try {

	const db = await client.db('game');
	const collection = await db.collection('gameRoomData');

	gameRooms = await collection.find({}, { projection: { _id: 0, roomId: 1,  players: 1} }).toArray();  //, (err, item) => {

	const collectionLobby = await db.collection('lobbyQueueData');
	lobbyQueue = await collectionLobby.find({}, { projection: { _id: 0, roomId: 1, players: 1} }).toArray();
 //    var updatedLobbyQueue = [];
	// for (i = 0; i < lobbyQueue.length; i++){
	// 	var updatedRoom = {};
	// //	var updatedPlayers = [];
	// //	updatedPlayers.
	// 	var updatedPlayers = [];
	// 	for (j = 0; j < lobbyQueue[i].players.length; j++){
	// 	var newPlayer = {email: lobbyQueue[i].players[j].email, firstname: lobbyQueue[i].players[j].firstname } ;
	// 	updatePlayers.push(newPlayer)
	// 	}
	// }

	result = {rooms: gameRooms, queues: lobbyQueue};
    } catch (e) {
        console.error(e);
    } 
    return result;
    // finally {
    //     await client.close();
    // }
};

async function enterLobbyQueueFromPlay(requestBody, vipLevel){
  //  databasesList = await client.db().admin().listDatabases();
	var chips = "0";
	var hasReceivedTierBonus = "false";
    var hasReceivedPurchaseBonus = "false";
    var giftValuesOrMerchandiseAmount = "0";

    if (vipLevel === "None") {
    	chips = "6000";
	 hasReceivedTierBonus = "false";
     hasReceivedPurchaseBonus = "false";
     giftValuesOrMerchandiseAmount = "0";
    }

  const db = await client.db('game');
  try{
  const collection = await db.collection('userData');
   await collection.insertOne(
 	{email: '' + requestBody.email,
 	  firstname: '' + requestBody.firstname,
	lastname:'' + requestBody.lastname,
	password: '' +requestBody.password,
	cardNumber: '' +requestBody.cardNumber,
	cardDate: '' +requestBody.cardDate,
	cardCVV: '' + requestBody.cardCVV,
	chips:  '' + chips,
	 hasReceivedTierBonus:  '' + hasReceivedTierBonus,
     hasReceivedPurchaseBonus:  '' + hasReceivedPurchaseBonus,
     giftValuesOrMerchandiseAmount: '' + giftValuesOrMerchandiseAmount,
     loggedIn: 'true',
     disconnected: 'false',
     lastUpdate: '0',
     gameScene: "MainMenu"

}, (err, res) => {
    if (err) throw err;
    console.log("1 document inserted");
    //db.close();
  });

   //console.log(resultOfInsert);
} catch(e) {
	console.log(e);

	return false;
}
return true;

};

async function createNewLobbyQueue(requestBody){
  //  databasesList = await client.db().admin().listDatabases();
	// var chips = "0";
	// var hasReceivedTierBonus = "false";
 //    var hasReceivedPurchaseBonus = "false";
 //    var giftValuesOrMerchandiseAmount = "0";

 //    if (vipLevel === "None") {
 //    	chips = "6000";
	//  hasReceivedTierBonus = "false";
 //     hasReceivedPurchaseBonus = "false";
 //     giftValuesOrMerchandiseAmount = "0";
 //    }
var result = {error: "Creating lobby queue error!"};

  const db = await client.db('game');
  try{
  //const collection = await db.collection('lobbyQueueData');

  var finalId = 0;
	const collection = await db.collection('gameRoomData');
	var gameRooms = await collection.find({}, { projection: { _id: 0, roomId: 1} }).toArray();
	finalId += gameRooms.length;
	 const collectionTwo = await db.collection('lobbyQueueData');
  
	var lobbyQueue = await collectionTwo.find({}, { projection: { _id: 0, roomId: 1} }).toArray();
	finalId += lobbyQueue.length;
// 		 if (emailAddress.length > 0){
// 	 	return true;
// 	 }

// return false;
   await collectionTwo.insertOne(
 	{roomId: '' + finalId,
 	  players: [{email: requestBody.email, firstname: requestBody.firstname}],
	queueState: 'Waiting for players'

}, (err, res) => {
    if (err) throw err;
    console.log("1 document inserted");
    //db.close();
    
  });
result = {success: "OK", roomId: '' + finalId};
   //console.log(resultOfInsert);
} catch(e) {
	console.log(e);

	//return false;
}
return result;

};

async function enterSpecificLobbyQueue(requestBody){
  //  databasesList = await client.db().admin().listDatabases();
	// var chips = "0";
	// var hasReceivedTierBonus = "false";
 //    var hasReceivedPurchaseBonus = "false";
 //    var giftValuesOrMerchandiseAmount = "0";

 //    if (vipLevel === "None") {
 //    	chips = "6000";
	//  hasReceivedTierBonus = "false";
 //     hasReceivedPurchaseBonus = "false";
 //     giftValuesOrMerchandiseAmount = "0";
 //    }
var result = {error: "Creating joining queue!"};
  const db = await client.db('game');
  try{
  const collection = await db.collection('lobbyQueueData');
  //var lobbyQueue = await collection.find({roomId: requestBody.roomId}, { projection: { _id: 0, roomId: 1} }).toArray();
 //await collection.findOne({roomId: requestBody.roomId},)
var lobbyPlayers = await collection.find({roomId: requestBody.roomId}, { projection: { _id: 0, players: 1 } }).toArray();
	// function(err, result) {
 //    if (err) throw err;
  
 //    result.save(function(err){
 //        console.log(err);
 //    });
 lobbyPlayers.push({email: requestBody.email, firstname: requestBody.firstname});


 	var myquery = {roomId: requestBody.roomId};
  var newvalues = {$set: { players: lobbyPlayers}};  //{$set: {disconnected: "false", loggedIn: "true", lastUpdate: "0" } };
   await collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
   console.log("added to room")
  result = {success: "OK", roomId: requestBody.roomId};
    //db.close();
  });
  
  //  db.close();
  //});
// if (lobbyQueue.length > 0){
// 	console.log("here");
// 	//if (Array.isArray(lobbyQueue[0].players)){
// 	//if (lobbyQueue[0].players.length < 8){
// 	await collection.update(
//    { roomId: requestBody.roomId},
//    { $push: { players: {email: requestBody.email, firstname: requestBody.firstname} } }
// )
	
// //}
// }
//}
//    await collection.insertOne(
//  	{email: '' + requestBody.email,
//  	  firstname: '' + requestBody.firstname,
// 	lastname:'' + requestBody.lastname,
// 	password: '' +requestBody.password,
// 	cardNumber: '' +requestBody.cardNumber,
// 	cardDate: '' +requestBody.cardDate,
// 	cardCVV: '' + requestBody.cardCVV,
// 	chips:  '' + chips,
// 	 hasReceivedTierBonus:  '' + hasReceivedTierBonus,
//      hasReceivedPurchaseBonus:  '' + hasReceivedPurchaseBonus,
//      giftValuesOrMerchandiseAmount: '' + giftValuesOrMerchandiseAmount,
//      loggedIn: 'true',
//      disconnected: 'false',
//      lastUpdate: '0',
//      gameScene: "MainMenu"

// }, (err, res) => {
//     if (err) throw err;
//     console.log("1 document inserted");
//     //db.close();
//   });

   //console.log(resultOfInsert);
} catch(e) {
	console.log(e);

	//return false;
}
return result;

};
// async function verifyEmail(email){
// 	 const db = await client.db('game');
// 	 const collection = await db.collection('userData');
// 	var emailAddress =  await collection.find({email: '' + email}, { projection: { _id: 0, email: 1 } }).toArray();//, (err, item) => {

// console.log(emailAddress);
//    console.log(emailAddress.length);
// 	 if (emailAddress.length > 0){
// 	 	return true;
// 	 }

// return false;
 
// };
async function submitPlayerAction(actionObject){
try {
        // Connect to the MongoDB cluster
         //await client.connect();

         //actionObject will have roomId
//find all collections
 		const db =  await client.db('game');
	 const collection =  await db.collection('gameRoomData');
var gameRoomPlayerActions =  await collection.find({roomId: '' + actionObject.roomId}, { projection: { _id: 0, playerActions: 1 } }).toArray();

if (gameRoomPlayerActions.length === 0) {

	const collectionUserData = await db.collection('userData');
	var userChips =  await collectionUserData.find({email: '' + actionObject.email}, { projection: { _id: 0, chips: 1 } }).toArray();

	if (actionObject.action === "call" || actionObject.action === "raise") {

		var myquery = { email: actionObject.email, password: actionObject.password};
  var newvalues = {$set: { chips: '' + (parseInt(userChips.chips) - parseInt(actionObject.amount))}};  //{$set: {disconnected: "false", loggedIn: "true", lastUpdate: "0" } };
   await collectionUserData.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(actionObject.email + " changed scene to " +  actionObject.destination);
  	
  	var aquery = { roomId: '' + actionObject.roomId};
  var anewvalues = {$set: { playerActions: actionObject}};  //{$set: {disconnected: "false", loggedIn: "true", lastUpdate: "0" } };
 
  	 collection.updateOne(aquery, avalues, function(err, res) {
    if (err) throw err;
    console.log(actionObject.email + " changed scene to " +  actionObject.destination);
  	
  	
    //db.close();
  });

    //db.close();
  });

		
	} else {
//fold

	var bquery = { roomId: '' + actionObject.roomId};
  var bnewvalues = {$set: { playerActions: actionObject}};  //{$set: {disconnected: "false", loggedIn: "true", lastUpdate: "0" } };
 
  	 collection.updateOne(bquery, bvalues, function(err, res) {
    if (err) throw err;
    console.log(actionObject.email +  " changed scene to " +  actionObject.destination);
  	
  	
    //db.close();
  });
	}
}
	} catch(e){
 
	}

};
 
async function gameLoop(){
try {
        // Connect to the MongoDB cluster
         //await client.connect();
 		const db =  await client.db('game');
	 const collection =  await db.collection('gameRoomData');
        // Make the appropriate DB calls
        //await  listDatabases(client);

      // await collection.find().forEach(function(data) { 
 
//});
    await collection.find().forEach(function(data) {
//smallblind, bigblind, flop, dealflop, playflop, turn, playturn, river, playriver, showdown, scoring, finish
  
  		var resultingRoom = new Dealer().consumePlayerActions(data);

 //   if (data.lastUpdate > 10){
	var myquery = { roomId: data.roomId};
  var newvalues = {$set: resultingRoom };
   collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(data.roomId + " updated game room");
    //db.close();
  });



});
    } catch (e) {
        console.error(e);
    } 
     
};

 async function updateLastTimeLoggedIn(){
	startGamesWithEnoughPeople();
 	gameLoop();

// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
// 	const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
         //await client.connect();
 		const db =  await client.db('game');
	 const collection =  await db.collection('userData');
        // Make the appropriate DB calls
        //await  listDatabases(client);

      // await collection.find().forEach(function(data) { 
 
//});
    await collection.find().forEach(function(data) {

   if (data.lastUpdate > 10){
	var myquery = { disconnected: "false" };
  var newvalues = {$set: {disconnected: "true", gameScene: "MainMenu"} };
   collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(data.email + " disconnected");
    //db.close();
  });


  }

  if (data.lastUpdate > 3600) {
var myquery = { loggedIn: "true" };
  var newvalues = {$set: {loggedIn: "false", gameScene: "MainMenu"} };
   collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(data.email + " logged out");
    //db.close();
  });

  } else if (data.lastUpdate < 3600){
  	 var myquery = { loggedIn: "true" };
  var newvalues = {$set: {lastUpdate: (parseInt(data.lastUpdate) + 1).toString()} };
    collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(data.email + " login timer updated");
    //db.close();
  });

  }
});
    } catch (e) {
        console.error(e);
    } 
    finally {
    //    await client.close();
        setTimeout(updateLastTimeLoggedIn, 1000);
    }

};

async function transitionScene(requestBody){
	 const db = await client.db('game');
	 const collection = await db.collection('userData');
	


  //await collection.find().forEach(function(data) {

   //if (data.lastUpdate > 10){
   	console.log(requestBody.email);
   	console.log(requestBody.password);
	var myquery = { email: requestBody.email, password: requestBody.password};
  var newvalues = {$set: {gameScene: requestBody.destination}};  //{$set: {disconnected: "false", loggedIn: "true", lastUpdate: "0" } };
   await collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(requestBody.email + " changed scene to " +  requestBody.destination);
  //return "" + requestBody.destination;
    //db.close();
  });
   //return data.game
     //result = {chips: data.chips, gameScene: data.gameScene};
  // });

return "" + requestBody.destination;
// console.log(emailAddress);
//    console.log(emailAddress.length);
// 	 if (emailAddress.length > 0){
// 	 	return true;
// 	 }

// return false;
 
};

 async function startGamesWithEnoughPeople(){

// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
// 	const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
         //await client.connect();
 		const db =  await client.db('game');
	 const collection =  await db.collection('lobbyQueueData');
        // Make the appropriate DB calls
        //await  listDatabases(client);

      // await collection.find().forEach(function(data) { 
 
//});
    await collection.find().forEach(function(data) {

   if (data.players.length == 8){
	// var myquery = {  : "false" };
 //  var newvalues = {$set: {disconnected: "true"} };
 //   collection.updateOne(myquery, newvalues, function(err, res) {
 //    if (err) throw err;
 //    console.log(data.email + " disconnected");
 //    //db.close();
 //  });
var playerData = [];

for (i = 0; i < data.players.length; i++){
playerData.push({email: data.players[i].email, firstname: data.players[i].firstname, chipsStocked: "0", chipsBlind: "0", cardsInHand : [], clockWisePositionFromButton: '' + i});
}



//*********HERE******




var dealer = new Dealer();

//const collectionUserData = await db.collection("userData");
 ///var userDataPlayers = await collection.find({email: collectionUserData.email, chips: collectionUserData.chips}, { projection: { _id: 0, email: 1, chips: 1} }).toArray();
 const collectionGameRoom =  db.collection('gameRoomData');
 var startingDeck = dealer.getDeck().instantiateDeck();
 startingDeck = dealer.getDeck().shuffle(startingDeck);
 var startingDealerState = dealer.initializeDealerState();
 collectionGameRoom.insertOne(
 	{roomId: '' + data.roomId,
 	players: playerData,
 	deck: startingDeck,
 	cardsInPlay: [],
 	dealerState: startingDealerState,
 	playerActions: [],
 	winner: "none"//,
 	//turnElapsedTime: 0
}, (err, res) => {
    if (err) throw err;
    console.log("1 document inserted");
    //db.close();
    collection.findOneAndDelete(data);
  });

 
  }

//   if (data.lastUpdate > 3600) {
// var myquery = { loggedIn: "true" };
//   var newvalues = {$set: {loggedIn: "false"} };
//    collection.updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log(data.email + " logged out");
//     //db.close();
//   });

//   } else if (data.lastUpdate < 3600){
//   	 var myquery = { loggedIn: "true" };
//   var newvalues = {$set: {lastUpdate: (parseInt(data.lastUpdate) + 1).toString()} };
//     collection.updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log(data.email + " login timer updated");
//     //db.close();
//   });

//   }
});
    } catch (e) {
        console.error(e);
    } 
    // finally {
    // //    await client.close();
    //     setTimeout(updateLastTimeLoggedIn, 1000);
    // }

};
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/goodbye', (req, res) => res.send('Goodbye World!'))
app.post('/encryptionTest', (req, res) => {
	
	var decryptedString = encryptionService.decrypt(req.body.encryptedString);

	res.send(decryptedString);

})





app.post('/signup', async (req, res) => {
	

	var responseString = "Error Somewhere";
	 try {
        // Connect to the MongoDB cluster
      //  await client.connect();
 
        // Make the appropriate DB calls
       // await  listDatabases(client);
 		var isEmail = await verifyEmail(req.body.email);

 		if (isEmail) {
 			responseString = "Email Already Exists";
 		} else {
 			responseString = "Email checked, problem signing up";
 			var isSignupGood = await attemptToSignUp(req.body, "None");
 			if (isSignupGood){
 				responseString = "OK";
 			}
 		}



    } catch (e) {
        console.error(e);
    }
    //  finally {
    //     await client.close();
    // }
    res.send(responseString);
})

app.post('/connectionpoll', async (req, res) => {

	// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri);
	var responseString = {response: "error"};
	 try {
        // Connect to the MongoDB cluster
        //await client.connect();
        if (canConnect){
        	responseString = await updateConnectionPoll(req.body);
        } 
 		
     


    } catch (e) {
        console.error(e);
        //responseString = "ERROR"
    } 
    // finally {

    //     await client.close();
    // }
    res.json(responseString);
})

app.post('/transitionscene', async (req, res) => {

	// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri);
	var responseString = {response: "error"};
	 try {
        // Connect to the MongoDB cluster
        //await client.connect();
 		responseString = await transitionScene(req.body);
  


    } catch (e) {
        console.error(e);
        //responseString = "ERROR"
    } 
    // finally {

    //     await client.close();
    // }
    res.json(responseString);
})

app.post('/populateonlinelist', async (req, res) => {

	// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri);
	var responseString = {response: "error"};
	 try {
        // Connect to the MongoDB cluster
        //await client.connect();
 		responseString = await populateOnlineList();
     


    } catch (e) {
        console.error(e);
        //responseString = "ERROR"
    } 
    // finally {

    //     await client.close();
    // }
    res.json(responseString);
})

app.post('/populatequeueandgameroomlist', async (req, res) => {

	// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri);
	var responseString = {response: "error"};
	 try {
    
         responseString = await populateQueuesandGameRooms();

    } catch (e) {
        console.error(e);
        //responseString = "ERROR"
    } 
    // finally {

    //     await client.close();
    // }
    res.json(responseString);
})

app.post('/createnewlobbyqueue', async (req, res) => {

	// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri);
	var responseString = {response: "error"};
	 try {
    
         responseString = await createNewLobbyQueue(req.body);

    } catch (e) {
        console.error(e);
        //responseString = "ERROR"
    } 
    // finally {

    //     await client.close();
    // }
    res.json(responseString);
})

app.post('/enterspecificlobbyqueue', async (req, res) => {

	// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri);
	var responseString = {response: "error"};
	 try {
    
         responseString = await enterSpecificLobbyQueue(req.body);

    } catch (e) {
        console.error(e);
        //responseString = "ERROR"
    } 
    // finally {

    //     await client.close();
    // }
    res.json(responseString);
})

app.post('/getlobbyqueuestate', async (req, res) => {

	// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri);
	var responseString = {response: "error"};
	 try {
    
         responseString = await getLobbyQueueState(req.body);

    } catch (e) {
        console.error(e);
        //responseString = "ERROR"
    } 
    // finally {

    //     await client.close();
    // }
    res.json(responseString);
})

app.post('/getgameroomstate', async (req, res) => {

	// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri);
	var responseString = {response: "error"};
	 try {
    
         responseString = await getGameRoomState(req.body);

    } catch (e) {
        console.error(e);
        //responseString = "ERROR"
    } 
    // finally {

    //     await client.close();
    // }
    res.json(responseString);
})

app.post('/submitplayeraction', async (req, res) => {

	// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri);
	var responseString = {response: "error"};
	 try {
    
         responseString = await submitplayeraction(req.body);

    } catch (e) {
        console.error(e);
        //responseString = "ERROR"
    } 
    // finally {

    //     await client.close();
    // }
    res.json(responseString);
})

app.post('/logout', async (req, res) => {
// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
// 	const client = new MongoClient(uri);
	var responseString = "Error Somewhere";
	 try {
        // Connect to the MongoDB cluster
       // await client.connect();
 		await logPlayerOut(req.body);
    
		responseString = "OK"


    } catch (e) {
        console.error(e);
        responseString = "ERROR"
    } 
    // finally {

    //     await client.close();
    // }
    res.send(responseString);

})

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

let connections = [];



const server = app.listen(port, () => {

	console.log(`Example app listening at http://localhost:${port}`);
	client.connect((err, db) =>{
		canConnect = true;
	});

	//main().catch(console.error);

	setTimeout(updateLastTimeLoggedIn, 1000);
	
})


server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    client.close();
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}