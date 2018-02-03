// index.js: The file containing the logic for the course of the game, which depends on Word.js and:

// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

// Dependencies
const inquirer = require("inquirer");
const word = require("./word");

// Global variables
var words = ["apple", "orange", "banana", "pineapple", "pear", "tomato"];
var guesses, currentWord, guessedCharacters;

console.log(`


███╗   ██╗ ██████╗ ██████╗ ███████╗        ██╗  ██╗ █████╗ ███╗   ██╗ ██████╗ ███╗   ███╗ █████╗ ███╗   ██╗
████╗  ██║██╔═══██╗██╔══██╗██╔════╝        ██║  ██║██╔══██╗████╗  ██║██╔════╝ ████╗ ████║██╔══██╗████╗  ██║
██╔██╗ ██║██║   ██║██║  ██║█████╗          ███████║███████║██╔██╗ ██║██║  ███╗██╔████╔██║███████║██╔██╗ ██║
██║╚██╗██║██║   ██║██║  ██║██╔══╝          ██╔══██║██╔══██║██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██║██║╚██╗██║
██║ ╚████║╚██████╔╝██████╔╝███████╗        ██║  ██║██║  ██║██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██║  ██║██║ ╚████║
╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝        ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
                                                                                                           

	`);


function newGame() {
	guesses = 7;
	guessedCharacters = [];
	var randomWord = words[Math.floor(Math.random()*words.length)];
	currentWord = new word.Word(randomWord);
	currentWord.createLetters();
	newTurn();
}
newGame();

function newTurn() {
	console.log("\n---------------------------------");
	console.log("\nCurrent word: "+currentWord.display());
	console.log("\nGuesses remaining: "+guesses);
	console.log("\n---------------------------------\n");
	inquirer.prompt([
		{
			type: "input",
			name: "choice",
			message: "Choose a letter...",
			validate: function(name) {
				if (name.length == 1) {return true;}
				else {return "Enter a single character only..."}//add presence in guessedCharacters into validation
			}
		}
	]).then(function(response){
		var letter = response["choice"];
		if(guessedCharacters.indexOf(letter)==-1) {
			guessedCharacters.push(letter);
			if(currentWord.check(letter)==false) {guesses--;}
			if (currentWord.complete) {endGame("win");}
			else if (guesses==0) {endGame("lose");}
			else {newTurn();}
	} else {
		console.log("You have already guessed that character");
		newTurn();
	}
	});
}

function endGame(outcome) {
	if(outcome=="win") {console.log(`

                                __ 
 __ __            _ _ _        |  |
|  |  |___ _ _   | | | |___ ___|  |
|_   _| . | | |  | | | | . |   |__|
  |_| |___|___|  |_____|___|_|_|__|
                                   

NEW GAME`);}
	else{console.log(`

                                    __ 
 __ __            __            _  |  |
|  |  |___ _ _   |  |   ___ ___| |_|  |
|_   _| . | | |  |  |__| . |_ -|  _|__|
  |_| |___|___|  |_____|___|___|_| |__|
                                       

NEW GAME`);}
	newGame();
}