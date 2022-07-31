let position = 0, 
    attempts = 10,
    location1,
    location2, 
    location3, 
    guess, 
    hits = 0, 
    guesses = 0, 
    result, 
    isSunk = false;
    if (position == 0) {
        position = rand(1, 2)
        let row, col;
        if (position === 1) { // горизонтально
            row = rand(1, 5);
            col = rand(1, 3);
            location1 = row + String(col);
            location2 = row + String(col + 1);
            location3 = row + String(col + 2);
        } else { // вертикально
            row = rand(1, 3);
            col = rand(1, 5);
            location1 = row + String(col);
            location2 = (row + 1) + String(col);
            location3 = (row + 2) + String(col);
        }
    }
console.log(location1);
console.log(location2);
console.log(location3);
    
while (!isSunk) {
    guess = prompt("В тебе є " + attempts + " спроб, щоб знищити корабель! (Зробіть вистріл, наприклад А1):");
    const row = mapNumberToAlphabetic(guess[0].toUpperCase());
    const col = guess[1];
    guess = row + col;
    try {
        if (guess < 11 || guess > 55) {
        throw "Введіть вірний вистріл"
        }
        if (isNaN(guess)) {
            throw "Ви ввели неправильне значення"
        }
    } 
    catch (error) {
        throw ("Уважніше " + error)
        сontinue
    }
    finally {
        let isChecked = false;
        guesses++;
        attempts--;
        if (guess == location1) {
            location1 = "disabled";
            isChecked = true;
        } else if (guess == location2) {
            location2 = "disabled";
            isChecked = true;
        } else if (guess == location3) {
            location3 = "disabled";
            isChecked = true;
        }
        if (isChecked) {
            alert("Попав!");
            hits++;
            if (hits == 3) {
                isSunk = true;
                alert("Ви потопили мій корабель!");
                break
            } 
        } else {
            alert("Промах");
        }
        if (guesses == 10) {
            alert("Спроби вичерпано. Ти програв")
            break
        }
    }
}
if (hits) {
    result = Math.floor((hits / guesses) * 100);
    alert("Ти взяв " + guesses + " спроб, щоб потопити мiй корабель, " + "це означає, що ваша точність стрільби була " + result +"%");
} else {
    alert("Ти взяв " + guesses + " спроб, щоб потопити мій корабель, і ні разу не влучив!");
}

function rand(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}
function mapNumberToAlphabetic(row) {
    switch (row) {
        case "A":
            return 1
        case "B":
            return 2
        case "C":
            return 3
        case "D":
            return 4
        case "E":
            return 5
    }
}