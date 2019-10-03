// Reads and sets the environment variables 
require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotifyKey = new Spotify(keys.spotify);
var ombKey = keys.omdb.key;
var bandsKey = keys.bands.id;


// vars to capture the user input
var userOption = process.argv[2];
var inputParameter = process.argv[3];

// execute function
UserInputs(userOption, inputParameter);

// Functions
function UserInputs (userOption, inputParameter) {
    switch (userOption) {
    case 'concert-this':
        showConcertInfo(inputParameter);
        break;
    case 'spotify-this-song':
        showSongInfo(inputParameter);
        break;
    case 'movie-this':
        showMovieInfo(inputParameter);
        break;
    case 'do-what-it-says':
        showInfo(inputParameter);
        break;
    default:
        console.log("Invalid Option. Please try typing in parameters again.")
    }
}
// Function for the Concert Info: Bands in Town

function showConcertInfo(inputParameter){
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=" + bandsKey;
    request(queryUrl, function(error, response, body) {
        //if the request goes through
        if(!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for(var i = 0; i < concerts.length; i++) {
               console.log("*************EVENTS INFO****************");
               fs.appendFileSync("log.txt", "******EVENTS INFO**********\n");
               console.log(i);
               fs.appendFileSync("log.txt", i + "\n");
               console.log("Name of the Venue: " + concerts[i].venue.name);
               fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name + "\n");
               console.log("Venue City: " + concerts[i].venue.city);
               fs.appendFileSync("log.txt", "Venue Location: " + concerts[i].venue.city + "\n");
               console.log("Event Date: " + concerts[i].datetime); 
               fs.appendFileSync("log.txt", "Event Date: " + concerts[i].datetime + "\n");
               console.log("*************************************");
               fs.appendFileSync("log.txt", "*****************************\n"); 
            }  
        } else{
            console.log("Error occured.")
        };
    })
};

// Function for the Music Info: Spotify
function showSongInfo(inputParameter) {
    if(inputParameter === undefined){
        inputParameter = "The Sign" //default song
    }
    spotifyKey.search(
        {type: "track", 
        query: inputParameter},
        function (err, data) {
            if (err) { 
            console.log("Error occures: " + err);
            return;
        }
    
    var songs = data.tracks.items;

    for (var i = 0; i < songs.length; i++) {
        console.log("*********SONG INFO*******");
        fs.appendFileSync("log.txt", "*********SONG INFO*******");
        console.log(i);
        fs.appendFileSync("log.txt", + i + "\n");
        console.log("Song name: " + songs[i].name);
        fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
        console.log("Preview song: " + songs[i].preview_url);
        fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n")
        console.log("Album: " + songs[i].album.name);
        fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
        console.log("Artist(s): " + songs[i].artists[0].name);
        fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
        console.log("***********************************************");
        fs.appendFileSync("log.txt", "*****************************\n");
        }
    });
}

// Function for the Movie Info: OMDB
function showMovieInfo(inputParameter){
    if(inputParameter === undefined){
        inputParameter = "Mr. Nobody" //default movie
        console.log("-------------------");
        fs.appendFileSync("log.txt", "----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=" + keys.omdb.key;
    request(queryUrl, function(error, response, body) {
        //If the request goes through
        if(!error && response.statusCode === 200) {
        var movies = JSON.parse(body);
        console.log("*********MOVIE INFO*******");
        fs.appendFileSync("log.txt", "*********MOVIE INFO*******\n");
        console.log("Title: " + movies.title);
        fs.appendFileSync("log.txt", "Title: " + movies.title + "\n");
        console.log("Release Year: " + movies.year);
        fs.appendFileSync("log.txt", "Release Year: " + movies.year + "\n");
        console.log("IMDB Rating: " + movies.imdbRating);
        fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n")
        console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
        fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");
        console.log("Country of Production: " + movies.country);
        fs.appendFileSync("log.txt", "Country of Production: " + movies.country + "\n");
        console.log("Language: " + movies.language);
        fs.appendFileSync("log.txt", "Language: " + movies.language + "\n");
        console.log("Plot: " + movies.plot);
        fs.appendFileSync("log.txt", "Plot: " + movies.plot + "\n");
        console.log("Actors: " + movies.actors);
        fs.appendFileSync("log.txt", "Actors: " + movies.actors + "\n");
        console.log("*****************************");  
        fs.appendFileSync("log.txt", "*****************************\n");   
        }else {
            console.log("Error occured.");
        }
    })
}

// Function to get the Rotten Tomatoes Rating
function getRottenTomatoesRatingObject (data) {
    return data.Ratings.find(function (item) {
       return item.Source === "Rotten Tomatoes";
    });
  }
  
  function getRottenTomatoesRatingValue (data) {
    return getRottenTomatoesRatingObject(data).Value;
  }

// function for reading out the random.txt file
function showInfo(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
	});
}