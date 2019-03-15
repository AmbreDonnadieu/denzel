const jsonFile=require('./filmsBDD.json')
const jsonFileA=require('./AwesomefilmsBDD.json')
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

var database, collect, collect2;
var jsonData = JSON.parse(fs.readFileSync("filmsBDD.json"));
var jsonAwesome = JSON.parse(fs.readFileSync("AwesomefilmsBDD.json"));


app.listen(9292, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collect = database.collection("movie");
		collect2 = database.collection("AwesomeMovies");
        console.log("Connected to `" + DATABASE_NAME + "`!");
		
    });
});


//curl -H "Accept: application/json" http://localhost:9292/movies/populate
//Populate the database with all the Denzel's movies from IMDb.
app.get("/movies/populate", (request, response) => {
    //One collection for all denzel movies 
	jsonData;
	collect.insertMany(jsonData, function(err, res){
		if (err) 
		{return response.status(500).send(err);}
		console.log("Number of documents inserted: " + res.insertedCount +" in movie collection.");
	});
	//one collection for awesome denzel movie (will be useful for the second request
	jsonAwesome;
	collect2.insertMany(jsonAwesome, function(err, res){
		if (err) 
		{return response.status(500).send(err);}
		console.log("Number of documents inserted: " + res.insertedCount+" in AwesomeMovies collection.");
	});
});


//curl -H "Accept: application/json" http://localhost:9292/movies
//Fetch a random must-watch movie
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

































