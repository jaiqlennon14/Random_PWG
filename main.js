// Defining my variables via the DOM
var resultEl = document.getElementById('result');
var lengthEl = document.getElementById('length');
var generatorEl = document.getElementById('generate');
var copyEl = document.getElementById('copy');
var uCase = document.getElementById('ucase');
var lCase = document.getElementById('lcase');
var numbersEl = document.getElementById('numbers');
var symbolEl = document.getElementById('symbols');

var randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}
// The Generator event, listened to

generate.addEventListener('click', () => {
	var length = +lengthEl.value;
	var hasLower = lCase.checked;
	var hasUpper = uCase.checked;
	var hasNumber = numbersEl.checked;
	var hasSymbol = symbolEl.checked;
	
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
 // Function to actually generate the password
function generatePassword(lower, upper, number, symbol, length) {
	var generatedPassword = '';
	var typesCount = lower + upper + number + symbol;
	var passArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return ''; // empty string if nothing is entered.
	}
	
	// create a loop
	for(var i=0; i<length; i+=typesCount) {
		passArray.forEach(type => {
			var funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	var finalPassword = generatedPassword.slice(0, length);
	
    return finalPassword;
};

// Bonus

copyEl.addEventListener('click', () => {
	var textarea = document.createElement('textarea');
	var password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert("N'joy your new password!");
});


function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	var symbolEl = '!@#$%^&*(){}[]=<>/,.'
	return symbolEl[Math.floor(Math.random() * symbolEl.length)];
}

// Notes

console.log(getRandomLower());
console.log(getRandomUpper());
console.log(getRandomNumber());
console.log(getRandomSymbol());
console.log("Some research shows theres a way to use cleaner code to grab characters for our code.")
