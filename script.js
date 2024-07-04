// Output
const output = document.querySelector("#output");
// Delete buttons
const clearBtn = document.querySelector("#clear-btn");
const backspaceBtn = document.querySelector("#backspace-btn");
// Operators
const operators = document.querySelectorAll(".operators");
// Numbers
const numbers = document.querySelectorAll(".numbers");
// Dot button
const dotBtn = document.querySelector("#dot-btn");

// Event listener for clearing output
clearBtn.addEventListener("click", () => {
    output.textContent = "0";
});

// Event listener for deleting digit in output
backspaceBtn.addEventListener("click", () => {
    if (output.textContent.length !== 1) {
    output.textContent = output.textContent.slice(0, -1); 
    } else {
        output.textContent = "0";
    }
});

let notPopulated = true;

// Display respective number
numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (notPopulated) {
            output.textContent = "";
            output.textContent += number.textContent;
            notPopulated = false;
        } else {
            if (output.textContent.length !== 10) {
            output.textContent += number.textContent;
            }
        } 
    });
});

// Check that thing you were thinking about creating objects such as event listeners and query selectors affecting performance.

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        notPopulated = true;
    });
});

function operate(operator, a, b) {
    switch (operator) {
        case 'add':
            return parseFloat(a) + parseFloat(b);
        case 'subtract':
            return parseFloat(a) - parseFloat(b);
        case 'multiply':
            return parseFloat(a) * parseFloat(b);
        case 'divide':
            if (parseFloat(b) === 0) return ('Cannot divide by zero');
            return parseFloat(a) / parseFloat(b);
        default:
            // throw new Error('Invalid operator: &{operation}');
    }
}

console.log(operate('/', 1, 1));