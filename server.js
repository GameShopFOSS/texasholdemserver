const express = require('express')
const app = express()
const {MongoClient} = require('mongodb');
var bodyParser = require('body-parser');

//const http = require('http');
const {EncryptionService} = require('./encryption-service.js');
var encryptionService = new EncryptionService();
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
    try {

const db = await client.db('game');
	 const collection = await db.collection('userData');

	//result = await collection.find({gameScene: "Lobby", loggedIn: "true", disconnected: "false"}, { projection: { _id: 0, firstname: 1, lastname: 1, email: 1 } }).toArray();//, (err, item) => {
	
    } catch (e) {
        console.error(e);
    } 
    return result;
    // finally {
    //     await client.close();
    // }
};
 async function updateLastTimeLoggedIn(){

// const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
// 	const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
         //await client.connect();
 		const db =  await client.db('game');
	 const collection =  await db.collection('userData');
        // Make the appropriate DB calls
        //await  listDatabases(client);

       await collection.find().forEach(function(data) { 
  var myquery = { loggedIn: "true" };
  var newvalues = {$set: {lastUpdate: (parseInt(data.lastUpdate) + 1).toString()} };
    collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(data.email + " login timer updated");
    //db.close();
  });
});
    await collection.find().forEach(function(data) {

   if (data.lastUpdate > 10){
	var myquery = { disconnected: "false" };
  var newvalues = {$set: {disconnected: "true"} };
   collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(data.email + " disconnected");
    //db.close();
  });


  }

  if (data.lastUpdate > 3600) {
var myquery = { loggedIn: "true" };
  var newvalues = {$set: {loggedIn: "false"} };
   collection.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(data.email + " logged out");
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
  
    //db.close();
  });
   //return data.game
     //result = {chips: data.chips, gameScene: data.gameScene};
  // });


// console.log(emailAddress);
//    console.log(emailAddress.length);
// 	 if (emailAddress.length > 0){
// 	 	return true;
// 	 }

// return false;
 
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
 		responseString = await updateConnectionPoll(req.body);
     


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
	client.connect();

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