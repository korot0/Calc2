function operate(operator, num1, num2) {
   
    let result;

    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 == 0) return "CANNOT DIVIDE BY ZERO";
            result = num1 / num2;
            break;
        default:
            // code block
    }
    return result;
}

console.log(operate('/', 1, 0));