// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

// An array of new Letter objects representing the letters of the underlying word
// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)

// Word.js should only require Letter.js

const letter = require("./letter");

function Word(word) {
	this.word = word;
	this.letters = [];
	this.complete = false;
	this.createLetters = function() {
		for (i=0; i<this.word.length; i++) {
			this.letters.push(new letter.Letter(this.word[i]));
		}
	}
	this.display = function() {
		var displayLetters = [];
		for (i=0; i<this.word.length; i++) {
			displayLetters.push(this.letters[i].display());
		}
		return displayLetters.join(" ");
	};
	this.check = function(letter) {
		var oldIncomplete = 0;
		var newIncomplete = 0;
		for (i=0; i<this.word.length; i++) {
			if (!this.letters[i].guessed) {oldIncomplete++;}
			this.letters[i].check(letter);
			if (!this.letters[i].guessed) {newIncomplete++;}
		}
		if (newIncomplete==0) {this.complete=true;}
		if (oldIncomplete>newIncomplete) {return true;}
		else {return false;}
	};
}

// // Testing
// var banana = new Word("banana");
// banana.createLetters();
// console.log(banana.letters);
// console.log(banana.display());
// banana.check("a");
// console.log(banana.display());

exports.Word = Word;