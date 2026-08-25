let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    // Prevent multiple operators in a row
    if (expression && !isOperator(expression.slice(-1))) {
        expression += op;
        updateDisplay();
    } else if (expression && op === '.' && !expression.slice(-1).includes('.')) {
        expression += op;
        updateDisplay();
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function updateDisplay() {
    display.value = expression;
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        if (expression) {
            // Use Function constructor as a safer alternative to eval
            const result = Function('"use strict"; return (' + expression + ')')();
            expression = result.toString();
            updateDisplay();
        }
    } catch (error) {
        display.value = 'Error';
        expression = '';
        setTimeout(() => updateDisplay(), 1500);
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
    if (e.key === '.') appendOperator('.');
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
});