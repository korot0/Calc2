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
    if (outputIsEmpty && output.textContent[1] != ".") {
        output.textContent = number;
        outputIsEmpty = false;
    } else {
        if (output.textContent.length < 10) {
            output.textContent += number;
        }
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
    if (output.textContent.indexOf(".") == -1) output.textContent += ".";
}

// Equals
function handleEqualsBtn() {
    if (expression.length > 1) {
        expression.push(parseFloat(output.textContent));
        outputPreview.textContent = `${expression[0]} ${expression[1]} ${expression[2]} =`; 
        expression[0] = operate(expression[0], expression[1], expression[2]);
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
        expression[1] = e;
        expression.pop();
        outputIsEmpty = false;
        outputPreview.textContent = `${expression[0]} ${expression[1]}`;    
    }
}

function operate(a, operator, b) {
    let answer;
    switch (operator) {
        case '+':
            answer = parseFloat(a) + parseFloat(b);
            break;
        case '-':
            answer = parseFloat(a) - parseFloat(b);
            break;
        case '*':
            answer = parseFloat(a) * parseFloat(b);
            break;
        case '/':
            if (parseFloat(b) == 0) return output.textContent = "Undefined";
            answer = parseFloat(a) / parseFloat(b);
            break;
    }
    return (answer < 99999999999) 
        ? output.textContent = Math.round((answer + Number.EPSILON) * 10000) / 10000
        : output.textContent = "Infinity";
}