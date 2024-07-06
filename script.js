/* TODO
    Keyboard support
    Max display string
    Pressing = before entering all of the numbers or an operator could cause problems!
*/

const output = document.querySelector("#output");
const outputPrev = document.querySelector("#output-preview");
const clearBtn = document.querySelector("#clear-btn");
const backspaceBtn = document.querySelector("#backspace-btn");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const dotBtn = document.querySelector("#dot-btn");
const equalBtn = document.querySelector("#equal-btn");
// Stack to hold order of operation
let stack = [];

// Event listener for clearing output
clearBtn.addEventListener("click", () => {
    outputIsEmpty = true;
    output.textContent = "0";
    outputPrev.textContent = "0";
    stack = [];
});

// Event listener for deleting digit in output
backspaceBtn.addEventListener("click", () => {
    if (output.textContent.length !== 1) {
    output.textContent = output.textContent.slice(0, -1); 
    } else {
        output.textContent = "0";
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

let dotFlag = true;
dotBtn.addEventListener("click", () => {
    if (dotFlag) {
        output.textContent += ".";
        dotFlag = false;
    }
});

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        if (stack.length == 0) {
            outputIsEmpty = true;
            dotFlag = true;
            stack.push(parseFloat(output.textContent));
            stack.push(e.target.textContent);
            outputPrev.textContent = `${stack[0]} ${stack[1]}`;
        } else {
            stack.push(parseFloat(output.textContent));
            stack[0] = operate(stack[0], stack[1], stack[2]);
            handleBigNum(stack[0]);
            stack[1] = e.target.textContent;
            stack.pop();
            outputIsEmpty = true;
            dotFlag = true;
            outputPrev.textContent = `${stack[0]} ${stack[1]}`;    
        }
    });
});

function handleBigNum(num) {
    (num < 99999999999) ? output.textContent = num : output.textContent = "Infinity";
}

equalBtn.addEventListener("click", () => {
    if (stack.length > 1) {
        stack.push(parseFloat(output.textContent));
        outputPrev.textContent = `${stack[0]} ${stack[1]} ${stack[2]} =`; 
        stack[0] = operate(stack[0], stack[1], stack[2]);
        handleBigNum(stack[0]);
        if (stack.length > 3) stack.pop();
    }
})

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