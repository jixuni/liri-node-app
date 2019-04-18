require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var divider = "\n-----------------------------------\n";

var searchType = process.argv[2];
var searchInput = process.argv[3];

function movieData(query) {
  var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + query;
  axios
    .get(queryUrl)
    .then(function(response) {
      var movieInfo = [
        "Movie Name: " + response.data.Title,
        "Year Released: " + response.data.Tear,
        "IMDB Rating: " + response.data.imdbRating,
        "Rotten Tomatoes Rating: " + response.data.Ratings[1].Source,
        "Country Produced: " + response.data.Country,
        "Language: " + response.data.Language,
        "Plot: " + response.data.Plot,
        "Actors: " + response.data.Actors
      ].join("\n\n");
      console.log(movieInfo);
      fs.appendFile("log.txt", movieInfo + divider, function(err) {
        if (err) throw err;
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

function bandData(artist) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios
    .get(queryUrl)
    .then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var concertDate = moment(response.data[i].datetime).format(
          "MM DD YYYY"
        );
        var concertInfo = [
          "Venue Name: " + response.data[i].venue.name + "\n",
          "Venue Location: " +
            response.data[i].venue.city +
            ", " +
            response.data[i].venue.country +
            "\n",
          "Venue Date: " + concertDate
        ].join("\n\n");
      }
      console.log(concertInfo);
      fs.appendFile("log.txt", concertInfo + divider, function(err) {
        if (err) throw err;
      });
    })
    .catch(function(err) {
      console.log(err);
    });
}

function songData(song) {
  spotify.search(
    {
      type: "track",
      query: song,
      limit: 1
    },
    function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }

      var artistData = [
        "Artist Name: " + data.tracks.items[0].artists[0].name,
        "Song Name: " + data.tracks.items[0].name,
        "Album Name: " + data.tracks.items[0].album.name,
        "Song Preview: " + data.tracks.items[0].preview_url
      ].join("\n\n");

      console.log(artistData);
      fs.appendFile("log.txt", artistData + divider, function(err) {
        if (err) throw err;
      });
    }
  );
}

function file() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");

    for (var i = 0; i < dataArr.length; i++) {
      if (dataArr[i] === "movie-this") {
        movieData(dataArr[i + 1]);
      }
      if (dataArr[i] === "spotify-this-song") {
        songData(dataArr[i + 1]);
      }
      if (dataArr[i] === "concert-this") {
        temp = dataArr[i + 1].replace(/["']/g, "");
        bandData(temp);
      }
    }
  });
}

switch (true) {
  case searchType === "movie-this" && searchInput === undefined:
    movieData("Mr.Nobody");
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
    break;
  default:
    console.log("NO input");
    break;
}
