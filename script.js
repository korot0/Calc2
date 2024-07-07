/* TODO
    Max display num and rounding
    Fix decimal point after hitting backspace
    Add suggestion of keydown
*/
const output = document.querySelector("#output");
const outputPreview = document.querySelector("#output-preview");
const clearBtn = document.querySelector("#clear-btn");
const backspaceBtn = document.querySelector("#backspace-btn");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const decimalBtn = document.querySelector("#dot-btn");
const equalBtn = document.querySelector("#equal-btn");
// Expression to hold order of operation
let expression = [];
// Flags
let outputIsEmpty = true;
let decimalExists = false;

// Keydown listeners
document.addEventListener("keydown", (event) => {
    // Check if the key pressed is a number key (0-9)
    if (event.key >= '0' && event.key <= '9') {
        handleNumbers(event.key);
    } else if (event.key === "Delete" || event.key === "Del") {
        handleClearBtn();
    } else if (event.key === "Backspace") {
        handleBackspaceBtn();
    } else if (event.key === ".") {
        handleDecimalBtn();
    } else if (event.key === "=" || event.key === "Enter") {
        event.preventDefault();
        handleEqualsBtn();
    } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        handleOperators(event.key);
    }
});

// Numbers listener
numbers.forEach(number => {
    number.addEventListener("click", () => handleNumbers(number.textContent));
});
// Operators listener
operators.forEach(operator => {
    operator.addEventListener("click", (e) => handleOperators(e.target.textContent));
});
// Clear button listener
clearBtn.addEventListener("click", () => handleClearBtn());
// Backspace listener
backspaceBtn.addEventListener("click", () => handleBackspaceBtn());
// Decimal point listener
decimalBtn.addEventListener("click", () => handleDecimalBtn());
// Equals button listener
equalBtn.addEventListener("click", () => handleEqualsBtn());

// Function to handle both button clicks and keydown
function handleNumbers(number) {
    if (outputIsEmpty && decimalExists) {
        output.textContent += number;
        outputIsEmpty = false;
    } else if (outputIsEmpty) {
        output.textContent = number;
        outputIsEmpty = false;
    } else {
        output.textContent += number;
    }
}

// Clear button function
function handleClearBtn() {
    outputIsEmpty = true;
    decimalExists = false;
    output.textContent = "0";
    outputPreview.textContent = "";
    expression = [];
}

// Backspace button function
function handleBackspaceBtn() {
    if (output.textContent != "Infinity") {
        (output.textContent.length !== 1) 
            ? output.textContent = output.textContent.slice(0, -1) 
            : output.textContent = "0";
    }
}

// Decimal button function
function handleDecimalBtn() {
    if (!decimalExists) {
        output.textContent += ".";
        decimalExists = true;
    }
}

// Equals button function
function handleEqualsBtn() {
    if (expression.length > 1) {
        expression.push(parseFloat(output.textContent));
        outputPreview.textContent = `${expression[0]} ${expression[1]} ${expression[2]} =`; 
        expression[0] = operate(expression[0], expression[1], expression[2]);
        handleNum(expression[0]);
        expression = [];
    }
}

// Operator buttons function
function handleOperators(e) {
    if (expression.length == 0) {
        outputIsEmpty = true;
        decimalExists = false;
        expression.push(parseFloat(output.textContent));
        expression.push(e);
        outputPreview.textContent = `${expression[0]} ${expression[1]}`;
    } else {
        expression.push(parseFloat(output.textContent));
        expression[0] = operate(expression[0], expression[1], expression[2]);
        handleNum(expression[0]);
        expression[1] = e;
        expression.pop();
        outputIsEmpty = false;
        decimalExists = false;
        outputPreview.textContent = `${expression[0]} ${expression[1]}`;    
    }
}

// *********************

function handleNum(num) {
    if (num === "Undefined") return output.textContent = "Undefined";
    if (num < 99999999999) {

        // output.textContent = num;
    } else {
        output.textContent = "Infinity";
    }
}

function operate(a, operator, b) {
    switch (operator) {
        case '+':
            return parseFloat(a) + parseFloat(b);
        case '-':
            return parseFloat(a) - parseFloat(b);
        case 'x':
            return parseFloat(a) * parseFloat(b);
        case '÷':
            if (parseFloat(b) == 0) return "Undefined";
            return parseFloat(a) / parseFloat(b);
    }
}

function round(num) {

}