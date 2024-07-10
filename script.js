// DOM elements
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
// Switch to check if the output currently has a number
let outputIsEmpty = true;

// Keydown listeners for keyboard input
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
        if (event.key == '*') {
            handleOperators('x'); // Convert * to x for operate function
        } else {
            handleOperators(event.key);
        }
    }
});

// Number button listener
numbers.forEach(number => {
    number.addEventListener("click", () => handleNumbers(number.textContent));
});
// Operator button listener
operators.forEach(operator => {
    operator.addEventListener("click", (e) => handleOperators(e.target.textContent));
});
// Clear button listener
clearBtn.addEventListener("click", () => handleClearBtn());
// Backspace button listener
backspaceBtn.addEventListener("click", () => handleBackspaceBtn());
// Decimal point button listener
decimalBtn.addEventListener("click", () => handleDecimalBtn());
// Equals button listener
equalBtn.addEventListener("click", () => handleEqualsBtn());

// Function to handle number button clicks and keyboard inputs
function handleNumbers(number) {
    if (outputIsEmpty) {
        output.textContent = number;
        outputIsEmpty = false;
    } else if (output.textContent.length < 10) {
        output.textContent += number;
    }
}

// Function to handle clear button
function handleClearBtn() {
    outputIsEmpty = true;
    output.textContent = "0";
    outputPreview.textContent = "";
    expression = [];
}

// Function to handle backspace button
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

// / Function to handle decimal point
function handleDecimalBtn() {
    if (output.textContent.indexOf(".") == -1) {
        output.textContent += "."; // Append decimal if not present
        outputIsEmpty = false;
    } else if (expression.length == 2) {
        output.textContent = "0." // Start new number with decimal if operator exists
        outputIsEmpty = false;
    }
}

// Function to handle equals
function handleEqualsBtn() {
    if (expression.length > 1) {
        expression.push(parseFloat(output.textContent));
        outputPreview.textContent = `${expression[0]} ${expression[1]} ${expression[2]} =`; 
        expression[0] = operate(expression[0], expression[1], expression[2]);
        expression = [];
        outputIsEmpty = true;
    }
}

// Function to handle operators
function handleOperators(e) {
    if (expression.length == 0) {
        outputIsEmpty = true;
        expression.push(parseFloat(output.textContent)); // Push current output into expression
        expression.push(e); // Push respective operator into expression
        outputPreview.textContent = `${expression[0]} ${expression[1]}`;
    } else {
        expression.push(parseFloat(output.textContent));
        expression[0] = operate(expression[0], expression[1], expression[2]); // Calculate for future operations without relying on equal button
        expression[1] = e;
        expression.pop();
        outputIsEmpty = true;
        outputPreview.textContent = `${expression[0]} ${expression[1]}`;    
    }
}

// Function to perform arithmetic
function operate(a, operator, b) {
    let answer;
    switch (operator) {
        case '+':
            answer = parseFloat(a) + parseFloat(b);
            break;
        case '-':
            answer = parseFloat(a) - parseFloat(b);
            break;
        case 'x':
            answer = parseFloat(a) * parseFloat(b);
            break;
        case '/':
            if (parseFloat(b) == 0) return output.textContent = "Cannot divide by zero";
            answer = parseFloat(a) / parseFloat(b);
            break;
    }
    return (answer < 99999999999) 
        ? output.textContent = Math.round((answer + Number.EPSILON) * 10000) / 10000 // Round to 4 decimals
        : output.textContent = "Infinity"; // Display infinity for large results
}