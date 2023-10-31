// 2+ 4 * 3 - 7
// 2 + (4 * 3) - 2
// (2 + (4 * 3)) - 2

const inputElement = document.getElementById('equation');
const outputElement = document.getElementById('results');
const form = document.getElementById('equation-form');
// const MULTIPLY_DIVIDE_REGEX = /((?<operand1>\S+)[-\d]+)\s*(?<operation>[\/\*])\s*((?<operand2>\S+)[-\d]+)/;
// const ADD_SUBTRACT_REGEX = /((?<operand1>\S+)[-\d]+)\s*(?<operation>[\-\+])\s*((?<operand2>\S+)[-\d]+)/;
// 1. by using \S in operand to avoiding big number issue, such as 233423435 * 3424324334
// 2. by using (?<!e) in operation to avoiding big number issue, such as 2e3435435345
const MULTIPLY_DIVIDE_REGEX = /(?<operand1>\S+)\s*(?<operation>[\/\*])\s*(?<operand2>\S+)/;
const EXPONENT_REGEX = /(?<operand1>\S+)\s*(?<operation>[\^])\s*(?<operand2>\S+)/;
const ADD_SUBTRACT_REGEX = /(?<operand1>\S+)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\S+)/;
const PARENTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/;

form.addEventListener('submit', e => {
  e.preventDefault();
  const result = parse(inputElement.value);
  outputElement.textContent = result;
});

// 2 + 3 * 42342424/ 7342334
  // const step = getNextStep();
  // const result = solve(step);
  // replaceNextStep(equation, step, result);
function parse(equation) {
  console.log((equation));
  if(equation.match(PARENTHESIS_REGEX)) {
    const subEquation = equation.match(PARENTHESIS_REGEX).groups.equation;
    const result = parse(subEquation);
    const newEquation = equation.replace(PARENTHESIS_REGEX, result);
    return parse(newEquation);
  } else if(equation.match(EXPONENT_REGEX)) {
    const result = handleMath(equation.match(EXPONENT_REGEX).groups);
    const newEquation = equation.replace(EXPONENT_REGEX, result);
    return parse(newEquation);
  } else if(equation.match(MULTIPLY_DIVIDE_REGEX)) {
    const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups);
    const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result);
    //console.log(newEquation);
    return parse(newEquation);
  } else if(equation.match(ADD_SUBTRACT_REGEX)){
    const result = handleMath(equation.match(ADD_SUBTRACT_REGEX).groups);
    const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result);
    //console.log(newEquation);
    return parse(newEquation);
  } else {
    return parseFloat(equation);
  }
}

function handleMath({ operand1, operand2, operation}) {
  const number1 = parseFloat(operand1);
  const number2 = parseFloat(operand2);
  switch(operation) {
    case '*':
      return number1 * number2;
    case '/':
      return number1 / number2;
    case '+':
      return number1 + number2;
    case '-':
      return number1 - number2;
    case '^':
      return number1 ** number2;
  }
}

//console.log('1 + (2 - 4) * 3'.match(PARENTHESIS_REGEX));

// const equation = '2 + 3 * 42342424/ 7342334';
// console.log(equation.match(MULTIPLY_DIVIDE_REGEX));