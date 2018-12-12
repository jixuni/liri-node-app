# liri-node-app

This is app that search movie database, song database, artist concert date.
It requires some dependecies for it to work.

To install the list of dependecies, just use the command :

```
npm install

```

The below gifs shows the command functions
```
node liri.js movie-this titanic      <---- will show movie data
node liri.js concert-this edsheeran  <---- will return concert date/venue if they have any
node liri.js spotify-this hello      <---- will return top spotify result with that song name
node liri.js do-what-it-says         <---- will loop through the text file and look for matching commands and index + 1 will 
                                           be the search input. (For some reason this loop will not work for OMDB axios)
```
```
Movie
```
![Alt Text](https://media.giphy.com/media/3fiw0vH32fvTC8oanf/giphy.gif)

```
Concert
```
![Alt Text](https://media.giphy.com/media/2wYxICYqQ8hXXS09cR/giphy.gif)

```
Spotify
```
![Alt Text](https://media.giphy.com/media/2tPrxgWLUdxVB8kkqA/giphy.gif)

```
bug with omdb axios

***UPDATE***
fixed the bug below, it has to do with concert api call. The api will not take string input with "".

```

<img width="882" alt="screen shot 2018-12-09 at 2 59 51 pm" src="https://user-images.githubusercontent.com/40869621/49702284-95315480-fbc4-11e8-855a-f240082822e9.png">






