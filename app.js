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
var url = require('url'); 

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
	return 0;
});


//curl -H "Accept: application/json" http://localhost:9292/movies
//Fetch a random must-watch movie
app.get("/movies", (request, response) => {
    console.log("Here is a random must-watch movie. its metascore is above 67");
	collect.aggregate([ {$match : {metascore : {$gt:67} }},{ $sample: { size: 1 } } ] ).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
		}
	console.log(result);
	stop();
  });
});

//curl -H "Accept: application/json" http://localhost:9292/movies/tt0427309
//Fetch a specific movie from its id.
app.get("/movies/:id", (request, response) => {
	console.log("Here is the result for the function which give us all the parameter of a film from its id. ");
	var query = { "id": request.params.id};
    collect.findOne(query,(error, result) => {
        if(error) {
            return response.status(500).send(error);
		}
		console.log(result);
  });
  return 0;
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

































