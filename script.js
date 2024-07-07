/* TODO
    Max display num and rounding
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

// Number listener
numbers.forEach(number => {
    number.addEventListener("click", () => handleNumbers(number.textContent));
});
// Operator listener
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

// Function to handle numbers
function handleNumbers(number) {
    if (outputIsEmpty) {
        output.textContent = number;
        outputIsEmpty = false;
    } else {
        output.textContent += number;
    }
}

// Clear button
function handleClearBtn() {
    outputIsEmpty = true;
    output.textContent = "0";
    outputPreview.textContent = "";
    expression = [];
}

// Backspace
function handleBackspaceBtn() {
    if (output.textContent != "Infinity") {
        if (output.textContent.length !== 1) { 
            output.textContent = output.textContent.slice(0, -1) 
        } else {
            output.textContent = "0";
            outputIsEmpty = true;
        }
    }
}

// Decimal point
function handleDecimalBtn() {
    if (output.textContent.indexOf(".") == -1) {
        output.textContent += ".";
    }
}

// Equals
function handleEqualsBtn() {
    if (expression.length > 1) {
        expression.push(parseFloat(output.textContent));
        outputPreview.textContent = `${expression[0]} ${expression[1]} ${expression[2]} =`; 
        expression[0] = operate(expression[0], expression[1], expression[2]);
        handleNum(expression[0]);
        expression = [];
    }
}

// Function to handle operators
function handleOperators(e) {
    if (expression.length == 0) {
        outputIsEmpty = true;
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