/* TODO
    Keyboard support
    Max display num and rounding
*/

const output = document.querySelector("#output");
const outputPrev = document.querySelector("#output-preview");
const clearBtn = document.querySelector("#clear-btn");
const backspaceBtn = document.querySelector("#backspace-btn");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const dotBtn = document.querySelector("#dot-btn");
const equalBtn = document.querySelector("#equal-btn");
// expression to hold order of operation
let expression = [];

// Event listener for clearing output
clearBtn.addEventListener("click", () => {
    outputIsEmpty = true;
    decimalFlag = true;
    output.textContent = "0";
    outputPrev.textContent = "";
    expression = [];
});

// Event listener for deleting digit in output
backspaceBtn.addEventListener("click", () => {
    if (output.textContent != "Infinity") {
        (output.textContent.length !== 1) 
            ? output.textContent = output.textContent.slice(0, -1) 
            : output.textContent = "0";
    }
});

let outputIsEmpty = true;
numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (outputIsEmpty) {
            output.textContent = "";
            output.textContent += number.textContent;
            outputIsEmpty = false;
        } else {
            output.textContent += number.textContent;
        }
    });
});

// Decimal point
let decimalFlag = true;
dotBtn.addEventListener("click", () => {
    if (decimalFlag) {
        output.textContent += ".";
        decimalFlag = false;
    }
});

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        if (expression.length == 0) {
            outputIsEmpty = true;
            decimalFlag = true;
            expression.push(parseFloat(output.textContent));
            expression.push(e.target.textContent);
            outputPrev.textContent = `${expression[0]} ${expression[1]}`;
        } else {
            expression.push(parseFloat(output.textContent));
            expression[0] = operate(expression[0], expression[1], expression[2]);
            handleBigNum(expression[0]);
            expression[1] = e.target.textContent;
            expression.pop();
            outputIsEmpty = true;
            decimalFlag = true;
            outputPrev.textContent = `${expression[0]} ${expression[1]}`;    
        }
    });
});

equalBtn.addEventListener("click", () => {
    if (expression.length > 1) {
        expression.push(parseFloat(output.textContent));
        outputPrev.textContent = `${expression[0]} ${expression[1]} ${expression[2]} =`; 
        expression[0] = operate(expression[0], expression[1], expression[2]);
        handleBigNum(expression[0]);
        expression = [];
    }
});

function handleBigNum(num) {
    (num < 99999999999) ? output.textContent = num : output.textContent = "Infinity";
}

function round(num) {
    let rounded = Math.round((num + Number.EPSILON) * 100) / 100
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
            if (parseFloat(b) === 0) return ('Cannot divide by zero');
            return parseFloat(a) / parseFloat(b);
        default:
            // throw new Error('Invalid operator: &{operation}');
    }
}