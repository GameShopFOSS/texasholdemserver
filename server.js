const express = require('express')
const app = express()
const {MongoClient} = require('mongodb');

//const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

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
 
 
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/goodbye', (req, res) => res.send('Goodbye World!'))
app.listen(port, () => {

	console.log(`Example app listening at http://localhost:${port}`)
	main().catch(console.error);
})