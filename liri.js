require("dotenv").config();


var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var keys = require("./keys");

var spotify = new Spotify(keys.spotify);



var searchType = process.argv[2];
var searchInput = process.argv[3];



function movieData(query) {
    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + query;
    axios.get(queryUrl)
        .then(function (response) {
            var movieInfo = [
                "Movie Name: " + response.data.Title,
                "Year Released: " + response.data.Tear,
                "IMDB Rating: " + response.data.imdbRating,
                "Rotten Tomatoes Rating: " + response.data.Ratings[1].Source,
                "Country Produced: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "Actors: " + response.data.Actors
            ]
            console.log(movieInfo);
        })
        .catch(function (error) {
            console.log(error);
        })
}


// if (searchType === "movie-this" && searchInput === undefined) {
//     movieData('Mr.Nobody');
// } else if (searchType === "movie-this") {
//     movieData(searchInput);
// }

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

// if (searchType === "concert-this") {
//     bandData(searchInput);
// }


function songData(song) {
    spotify.search({
            type: 'track',
            query: song,
            limit: 1,
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var artistData = [
                "Artist Name: " + data.tracks.items[0].artists[0].name,
                "Song Name: " + data.tracks.items[0].name,
                "Album Name: " + data.tracks.items[0].album.name,
                "Song Preview: " + data.tracks.items[0].preview_url
            ]

            console.log(artistData);

        }

    );
}

// if (searchType === "spotify-this-song") {
//     songData(searchInput);
// }

function file() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }

        var dataArr = data.split(",")

        for (var i = 0; i < dataArr.length; i++) {

            if (dataArr[i] === "movie-this") {
                movieData(dataArr[i + 1]);
            }
            if (dataArr[i] === "spotify-this-song") {
                songData(dataArr[i + 1]);
            }
            if (dataArr[i] === "concert-this") {
                bandData(dataArr[i + 1]);
            }
        }
    })
}

// if (searchType === "do-what-it-says") {
//     file();
// }



switch (true) {
    case searchType === "movie-this" && searchInput === undefined:
        movieData('Mr.Nobody');
        break;
    case searchType === "movie-this":
        movieData(searchInput);
        break;
    case searchType === "spotify-this-song":
        songData(searchInput);
        break;
    case searchType === "concert-this":
        bandData(searchInput);
        break;
    case searchType === "do-what-it-says":
        file();

    default:
        console.log("NO input");
        break;

}