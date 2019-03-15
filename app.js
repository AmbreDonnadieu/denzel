const jsonFile=require('./filmsBDD.txt')
const fs = require('fs');

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://UserExample:miaou@example-uof3e.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "movies";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collect;
var monfichier = fs.readFileSync("filmsBDD.json");
var jsonData = JSON.parse(monfichier);



app.listen(9292, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collect = database.collection("movie");
        console.log("Connected to `" + DATABASE_NAME + "`!");
		
    });
});


//curl -H "Accept: application/json" http://localhost:9292/movies/populate

app.get("/movies/populate", (request, response) => {
    jsonData;
	collect.insertMany(jsonData, function(err, res){
		if (err) 
		{return response.status(500).send(err);}
		console.log("Number of documents inserted: " + res.insertedCount);
	});
});

//curl -H "Accept: application/json" http://localhost:9292/movies

app.get("/movies", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
		console.log("Number of documents inserted: " + res.insertedCount);
        response.send(result.result);
    });
});

//curl -H "Accept: application/json" http://localhost:9292/movies/tt0477080

app.get("/movies/:id", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

//curl -H "Accept: application/json" http://localhost:9292/movies/search?limit=5&metascore=77

app.get("/movies/search", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

//curl -X POST -d '{"date": "2019-03-04", "review": "😍 🔥"}' -H "Content-Type: application/json" http://localhost:9292/movies/tt0328107

app.post("/movies/:id", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

































