let express = require('express');
let bodyParser = require('body-parser');
let path = require("path");

let app = express();
let PORT = process.env.PORT || 3000;

//handle data parsing
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//app listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// Star Wars Characters (DATA) + mysql call eventually
var characters = [
    {
      routeName: "Finn",
      name: "Finn",
      role: "Resistance Fighter",
      age: 25,
      forcePoints: 2000
    },
    {
      routeName: "darthvader",
      name: "Darth Vader",
      role: "Ex-Jedi",
      age: 200,
      forcePoints: 1200
    },
    {
      routeName: "obiwankenobi",
      name: "Obi Wan Kenobi",
      role: "Jedi Master",
      age: 55,
      forcePoints: 1350
    }
  ];

//routes
app.get('/', function(req, res) {
    res.sendFile(path.join(_dirname, 'index.html'));
    console.log('this is the homepage');
});

//api route
app.get('/api/characters', function(req, res){
  return res.json(characters);
});

app.get('/api/characters/:character', function(req, res){
    let chosen = req.params.character;
    
    for(var i = 0; i < characters; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }
    return res.send('no character found');
});

// creating a character
app.post('/api/characters', function(req, res) {
    let newCharacter = req.body;

    characters.push(newCharacter);

    res.json(newcharacter);
});