document.addEventListener("DOMContentLoaded", function () {
  const outputPrevious = document.querySelector(".previous-operand");
  const outputCurrent = document.querySelector(".current-operand");
  const buttons = document.querySelectorAll(".calculator-grid button");

  let currentOperand = "";
  let previousOperand = "";
  let operator = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = button.textContent;
      if (buttonText === "AC") clear();
      else if (buttonText === "DEL") deleteLast();
      else if (buttonText.match(/[0-9.]/)) appendNumber(buttonText);
      else if (buttonText.match(/[\+\-\*\/]/)) setOperator(buttonText);
      else if (buttonText === "=") compute();
      updateDisplay();
    });
  });

  const clear = () => {
    currentOperand = "";
    previousOperand = "";
    operator = "";
  };
  const deleteLast = () => {
    currentOperand = currentOperand.toString().slice(0, -1);
  };
  const appendNumber = (number) => {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand += number;
  };
  const setOperator = (op) => {
    if (currentOperand === "") return;
    if (previousOperand !== "") compute();
    operator = op;
    previousOperand = currentOperand;
    currentOperand = "";
  };
  const compute = () => {
    const prev = parseFloat(previousOperand),
      current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
      case "+":
        currentOperand = prev + current;
        break;
      case "-":
        currentOperand = prev - current;
        break;
      case "*":
        currentOperand = prev * current;
        break;
      case "/":
        currentOperand = prev / current;
        break;
      default:
        return;
    }
    previousOperand = "";
    operator = "";
  };
  const updateDisplay = () => {
    outputCurrent.textContent = currentOperand;
    outputPrevious.textContent = previousOperand + operator;
  };
});
