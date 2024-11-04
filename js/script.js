const STACK_MAX_SIZE = 3;

const stack = [];

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".btn-digit");
const operationButtons = document.querySelectorAll(".btn-operate");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const signalButton = document.querySelector(".sign");
const percentButton = document.querySelector(".percent");

[...digitButtons].forEach(digitButton => {
    digitButton.addEventListener("click", (e) => {
        if (display.innerText === '0' || display.innerText === "ERROR")
            display.innerText = '';

        if (isOperator(stackPeek(stack))) {
            display.innerText = '';
            stackPush(stack, '');
        }

        let p = stackPop(stack);
        p = p === null ? e.target.innerText : p + e.target.innerText;
        stackPush(stack, p);

        display.innerText += e.target.innerText;

        console.log(stack);
    });
});

[...operationButtons].forEach(operationButton => {
    operationButton.addEventListener("click", (e) => {
        if (isOperator(stackPeek(stack)))
            stackPop(stack);

        if (stack.length === STACK_MAX_SIZE) {
            let secondNumber = stackPop(stack);
            let operation = stackPop(stack);
            let firstNumber = stackPop(stack);

            let result = parseFloat(
                operate(firstNumber, secondNumber, operation).toFixed(8)
            );

            if (result === Infinity) {
                result = "ERROR";
            } else {
                stackPush(stack, display.innerText);
            }

            display.innerText = `${result}`;
        }

        stackPush(stack, e.target.innerText);
        console.log(stack);
    });
});

equalsButton.addEventListener("click", () => {
    let secondNumber = stackPop(stack);
    let operation = stackPop(stack);
    let firstNumber = stackPop(stack);

    let result = parseFloat(
        operate(firstNumber, secondNumber, operation).toFixed(8)
    );

    if (result === Infinity) {
        result = "ERROR"
    } else {
        stackPush(stack, display.innerText);
        stackPush(stack, operation);
    }

    display.innerText = `${result}`;

    console.log(stack);
});

clearButton.addEventListener("click", () => {
    display.innerText = 0;

    for (let i = 0; i < STACK_MAX_SIZE; i++) {
        stackPop(stack);
    }

    console.log(stack);
});

signalButton.addEventListener("click", () => {
    if (display.innerText[0] === '-') {
        display.innerText = display.innerText.substring(1);
    } else {
        display.innerText = '-' + display.innerText;
    }
    stackPop(stack);
    stackPush(stack, display.innerText);
    console.log(stack);
})

percentButton.addEventListener("click", () => {
    let result = parseFloat(display.innerText);
    result = parseFloat((result / 100).toFixed(8));
    display.innerText = `${result}`;
    stackPop(stack);
    stackPush(stack, display.innerText);
    console.log(stack);
})

function isOperator(symbol) {
    return '+-x÷'.includes(symbol);
}

function stackPush(stack, item) {
    stack.push(item);
}

function stackPeek(stack) {
    if (stack.length === 0) return null;
    return stack[stack.length - 1];
}

function stackPop(stack) {
    if (stack.length === 0) return null;
    return stack.pop();
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(firstNumber, secondNumber, operation) {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    switch (operation) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case 'x':
            return multiply(firstNumber, secondNumber);
        case '÷':
            return divide(firstNumber, secondNumber);
    }
}