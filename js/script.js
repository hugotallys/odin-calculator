let firstNumber = '1';
let secondNumber = '1';
let operation = '+';

let displayNumber = '0';

const digitButtons = document.querySelectorAll(".btn-digit");
const display = document.querySelector(".display");

[...digitButtons].forEach(digitButton => {
    digitButton.addEventListener("click", (e) => {
        if (display.innerText === '0')
            display.innerText = '';
        display.innerText += e.target.innerText;
    });
});

const operationButtons = document.querySelectorAll(".btn-operator");

[...operationButtons].forEach(operationButton => {
    operationButton.addEventListener("click", (e) => {
        firstNumber = display.innerText;
        display.innerText = '0';
        operation = e.target.innerText;
    });
});

const equalsButton = document.querySelector(".equals");

equalsButton.addEventListener("click", () => {
    secondNumber = display.innerText;
    let result = operate(firstNumber, secondNumber, operation);
    display.innerText = `${result}`;
});

const clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", () => {
    firstNumber = null;
    secondNumber = null;
    operation = null;
    display.innerText = 0;
});

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
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);

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