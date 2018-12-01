require("dotenv").config();


var keys = require("./keys.js");

// ------ASSIGN APIs--------


var nodeArgsTwo = process.argv[2];

if (nodeArgsTwo === "concert-this") {
    bandsInTown();
} else if (nodeArgsTwo === "spotify-this-song") {
    spotify();
} else if (nodeArgsTwo === "movie-this") {
    OMDB();
} else if (nodeArgsTwo === "do-what-it-says") {
    doWhatItSays();
};


// -------DO WHAT IT SAYS---------


function doWhatItSays() {

    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function (error, data) {
        
        dataArr = data.split(',');

        console.log(dataArr[0]);
        console.log(dataArr[1]);
    
    
        var Spotify = require('node-spotify-api');

        var spotify = new Spotify(keys.spotify);
        
        var songTitle = dataArr[1];

        spotify.search({
            type: "track",
            query: songTitle
        }, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                // console.log(response.tracks);

                //   * Artist(s)
                console.log(response.tracks.items[0].artists[0].name);

                // //   * The song's name
                console.log(response.tracks.items[0].name);
                //   * A preview link of the song from Spotify
                console.log(response.tracks.items[0].preview_url);

                //   * The album that the song is from
                console.log(response.tracks.items[0].album.name);
            }
        });
    });
}

    // // -------SPOTIFY--------

    function spotify() {
        var Spotify = require('node-spotify-api');

        var spotify = new Spotify(keys.spotify);

        var nodeArgs = process.argv;

        var songTitle = "";

        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {
                songTitle = songTitle + "+" + nodeArgs[i];
            } else {
                songTitle += nodeArgs[i];

            }
        }

        if (!songTitle) {
            songTitle = "The sign"
        }

        spotify.search({
            type: "track",
            query: songTitle
        }, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                // console.log(response.tracks);

                //   * Artist(s)
                console.log(response.tracks.items[0].artists[0].name);

                // //   * The song's name
                console.log(response.tracks.items[0].name);

                //   * A preview link of the song from Spotify
                console.log(response.tracks.items[0].preview_url);

                //   * The album that the song is from
                console.log(response.tracks.items[0].album.name);


                // * If no song is provided then your program will default to "The Sign" by Ace of Base.

            }

        });

        
    }




    // --------OMDB--------

    function OMDB() {
        var request = require('request');
        var omdb_key = process.env.key;

        var nodeArgs1 = process.argv;

        var movieTitle = "";

        for (var i = 3; i < nodeArgs1.length; i++) {

            if (i > 3 && i < nodeArgs1.length) {
                movieTitle = movieTitle + "+" + nodeArgs1[i];
            } else {
                movieTitle += nodeArgs1[i];

            }
        }

        if (!movieTitle) {
            movieTitle = "Mr. Nobody"
        }

        request("http://www.omdbapi.com/?apikey=" + omdb_key + "&t=" + movieTitle, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)`      
            if (!error) {
                //     * Title of the movie.
                console.log(JSON.parse(body).Title);
                //     * Year the movie came out.
                console.log(JSON.parse(body).Year);
                //     * IMDB Rating of the movie.
                console.log(JSON.parse(body).Rated);
                //     * Rotten Tomatoes Rating of the movie.
                if ((JSON.parse(body).Ratings[1])) {
                    console.log(JSON.parse(body).Ratings[1].Value);
                } else {
                    console.log(JSON.parse(body).Ratings[1]);
                }
                //     * Country where the movie was produced.
                console.log(JSON.parse(body).Country);
                //     * Language of the movie.
                console.log(JSON.parse(body).Language);
                //     * Plot of the movie.
                console.log(JSON.parse(body).Plot);
                //     * Actors in the movie.
                console.log(JSON.parse(body).Actors);

            }
        });
    }



    // ------- BANDS IN TOWN -------



    function bandsInTown() {

        var axios = require("axios");

        var moment = require('moment');
        moment().format();

        var nodeArgs2 = process.argv;

        var bandTitle = "";

        for (var i = 3; i < nodeArgs2.length; i++) {

            if (i > 3 && i < nodeArgs2.length) {
                bandTitle = bandTitle + "+" + nodeArgs2[i];
            } else {
                bandTitle += nodeArgs2[i];

            }
        }



        axios.get("https://rest.bandsintown.com/artists/" + bandTitle + "/events?app_id=" + process.env.BandsAPIKey).then(
            function (response) {
                // console.log(response.data);

                // * Name of the venue
                console.log(response.data[5].venue.name);

                //      * Venue location
                console.log(response.data[5].venue.city);

                //      * Date of the Event (use moment to format this as "MM/DD/YYYY")
                console.log(moment(response.data[5].datetime).format("MM/DD/YYYY"));
            }
        )
        }

