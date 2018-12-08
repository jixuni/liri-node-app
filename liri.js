require("dotenv").config();

var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api")


var searchType = process.argv[2];
var searchInput = process.argv[3];



function movieData(query) {
    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + query;
    axios.get(queryUrl)
        .then(function (response) {
            console.log(response);
        })
}


if (searchType === "movie-this" && searchInput === undefined) {
    movieData('Mr.Nobody');
} else if (searchType === "movie-this") {
    movieData(searchInput);
}

function bandData(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl)
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var concertDate = moment(response.data[i].datetime).format('MM DD YYYY');
                console.log(
                    "Venue Name: " + response.data[i].venue.name + '\n',
                    "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country + '\n',
                    "Venue Date: " + concertDate);
            }

        })
}

if (searchType === "concert-this") {
    bandData(searchInput);
} 


function songData(song){
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}

if (searchType === "spotify-this"){
    songData(searchInput);
}