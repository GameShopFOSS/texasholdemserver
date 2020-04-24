const express = require('express')
const app = express()
const {MongoClient} = require('mongodb');
var bodyParser = require('body-parser');

//const http = require('http');
const {EncryptionService} = require('./encryption-service.js');
var encryptionService = new EncryptionService();
const hostname = '127.0.0.1';
const port = 8080;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    //const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
 

    //const client = new MongoClient(uri);
 	const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

//main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 

async function verifyEmail(client, email){
	 const db = await client.db('game');
	 const collection = await db.collection('userData');
	var emailAddress =  await collection.find({name: '' + email});//, (err, item) => {
	 // 	if (item){
		// console.log(item);
		// return item;
	 // 	} else {
	 // 		console.log("no matching email address");
	 // 	}
	 // 	return "";
  
//}).toArray();
console.log(emailAddress);
   console.log(emailAddress.length);
	 if (emailAddress.length > 0){
	 	return true;
	 }

return false;
 
};

async function attemptToSignUp(client, requestBody, vipLevel){
  //  databasesList = await client.db().admin().listDatabases();
	var chips = "0";
	var hasReceivedTierBonus = "false";
    var hasReceivedPurchaseBonus = "false";
    var giftValuesOrMerchandiseAmount = "0";

    if (vipLevel == "None") {
    	chips = "0";
	 hasReceivedTierBonus = "false";
     hasReceivedPurchaseBonus = "false";
     giftValuesOrMerchandiseAmount = "0";
    }

  const db = await client.db('game');
  try{
  const collection = await db.collection('userData');
  var resultOfInsert = await collection.insertOne(
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
     lastUpdate: '0'

});
   console.log(resultOfInsert);
} catch(e) {
	console.log(e);

	return false;
}
return true;
//, (err, result) => {
// if (result){
// 		console.log(result);
// 		return result;
// 	 	} else {
// 	 		console.log("failed");
// 	 	}
// 	 	return "";
//}).toArray();

//  if (userInsert.length > 0){
// 	 	return true;
// 	 }

// return false;
 
    // console.log("Databases:");
    // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};



app.get('/', (req, res) => res.send('Hello World!'))
app.get('/goodbye', (req, res) => res.send('Goodbye World!'))
app.post('/encryptionTest', (req, res) => {
	
	var decryptedString = encryptionService.decrypt(req.body.encryptedString);

	res.send(decryptedString);

})

app.post('/signup', async (req, res) => {
	
	// var email = req.body.email;
	// var firstname = req.body.firstname;
	// var lastname = req.body.lastname;
	// var password = req.body.password;
	// var cardNumber =req.body.cardNumber;
	// var cardDate = req.body.cardDate;
	// var cardCVV = req.body.cardCVV;
 	//var chips = 6000;
    //var vipLevel = "None";
    //var hasReceivedTierBonus = false;
    //var hasReceivedPurchaseBonus = false;
    //var giftValuesOrMerchandiseAmount = 0;

    const uri = "mongodb+srv://jayevans:dD9kkTx81UKKWn1y@cluster0-phdbo.gcp.mongodb.net/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri);
	var responseString = "Error Somewhere";
	 try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
       // await  listDatabases(client);
 		var isEmail = await verifyEmail(client, req.body.email);

 		if (isEmail) {
 			responseString = "Email Already Exists";
 		} else {
 			responseString = "Email checked, problem signing up";
 			var isSignupGood = await attemptToSignUp(client, req.body, "None");
 			if (isSignupGood){
 				responseString = "OK";
 			}
 		}



    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    res.send(responseString);
})
app.listen(port, () => {

	console.log(`Example app listening at http://localhost:${port}`)
	main().catch(console.error);
})