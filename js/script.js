// var location1 = rand(1, 3); // расположение корабля
// var location2 = location1 + 1; // расположение корабля
// var location3 = location2 + 1; // расположение корабля
// var guess; // номер текущей попытки
// var hits = 0; // количество попаданий
// var guesses = 0; // количество попыток
// var isSunk = false; // потоплен корабль или нет
// while (isSunk == false) {
//     guess = prompt("Ready, aim, fire! (enter a number 1-5):");
//     if (guess < 1 || guess > 5) {
//         alert("Please enter a valid cell number!");
//     } else {
//         guesses++;
//         if (guess == location1 || guess == location2 || guess == location3) {
//             alert("HIT!");
//             hits++;
//             if (hits == 3) {
//                 isSunk = true;
//                 alert("You sank my battleship!");
//             } 
//         } else {
//             alert("MISS");
//         }
//     }
// }
// var stats = "You took " + guesses + " guesses to sink the battleship, " + "which means your shooting accuracy was " + (3/guesses);
// alert(stats);
// 
function rand(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min
}


const model = {
	boardSize: 5,
	numShips: 1,
	shipLength: 3,
	shipsSunk: 0,
	
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],

    generateShip: function() {
		let direction = rand(1, 2);
		let row, col;

		if (direction === 1) { // horizontal
			row = rand(0, 4);
			col = rand(0, 2);
		} else { // vertical
			row = rand(0, 2);
			col = rand(0, 4);
		}

		const newShipLocations = [];
		for (let i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

    generateShipLocations: function() {
		let locations;
		for (let i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

    isSunk: function(ship) {
		for (let i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},

	fire: function(guess) {
		for (let i = 0; i < this.numShips; i++) {
			let ship = this.ships[i];
			let index = ship.locations.indexOf(guess);

			if (ship.hits[index] === "hit") {
				alert("На жаль, ви вже потрапили в це місце!");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				// alert(guess);
				alert("HIT!");

				if (this.isSunk(ship)) {
					// alert("Ви потопили мій корабель!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		// alert(guess);
		alert("Промах.");
		return false;
	},

	collision: function(locations) {
		for (let i = 0; i < this.numShips; i++) {
			let ship = this.ships[i];
			for (let j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	
}; 

const controller = {
	guesses: 0,

	processGuess: function(guess) {
		let location = parseGuess(guess);
		if (location) {
			this.guesses++;
			let hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
					alert("Ви потопили мій корабль за " + this.guesses + " спроби");
			}
		}
	}
}

function parseGuess(guess) {
	const alphabet = ["A", "B", "C", "D", "E"];

	if (guess === null || guess.length !== 2) {
		alert("На жаль, введіть літеру та цифру на дошці.");
	} else {
		let firstChar = guess.charAt(0);
		let row = alphabet.indexOf(firstChar);
		let column = String(guess.charAt(1) - 1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Ой, цього немає на дошці.");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Ой, це не прийнято!");
		} else {
			return row + column;
		}
	}
	return null;
}


// event handlers

function handleFireButton() {
	let guessInput = document.getElementById("guessInput");
	let guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = "";
}

function handleKeyPress(e) {
	let fireButton = document.getElementById("fireButton");

	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

window.onload = init;

function init() {
	// Fire! button onclick handler
	let fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	let guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// place the ships on the game board
	model.generateShipLocations();
}
