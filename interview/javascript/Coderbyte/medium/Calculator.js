/*
input string and calculate according to mathematical system
"6*(4/2)+3*1" -> 15
"2+(3-1)*3" -> 8
*/
function Calculator(str) {
    var stack = [];
    var lastToken;
    var performFunc = function(a, b, func) {
        switch(func) {
            case "+": 
                return a + b;
                break;
            case "-": 
                return a - b;
                break;
            case "/": 
                return a / b;
                break;
            case "*": 
                return a * b;
                break;
        }
    };
    var processStack = function(stack) {
    var i = 0;
    if(stack.length == 0)
      return NaN;
      
    if(stack.length == 1)
      return stack;
      
    while(i < stack.length && stack.length > 2) {
      if(stack[i+1] == '*' || stack[i+1] == '/') {
        var a = stack[i];
        var b = stack[i+2];
        var func = stack[i+1];
        var value = performFunc(a,b,func);
        stack.splice(i,3,value);
      } else {i+=2;}
    }
    i = 0;
    while(i < stack.length && stack.length > 2) {
      if(stack[i+1] == '+' || stack[i+1] == '-') {
        var a = stack[i];
        var b = stack[i+2];
        var func = stack[i+1];
        var value = performFunc(a,b,func);
        stack.splice(i,3,value);
      } else {i+=2;}
    }
    return stack;
  };

  var processChar = function(char) {
    if(char == "+") {
      stack.push("+");
    } else if(char == "-") {
      stack.push("-");
    } else if(char == "/") {
      stack.push("/");
    } else if(char == "*") {
      stack.push("*");
    } else if(char == "(") {
      if(lastToken === ")" ||
         ( lastToken !== undefined &&
           lastToken.match(/d+/g) != null)) {
        stack.push("*");
      }
      stack.push("(");
    } else if(char == ")") {
      var parenStack = [];
      while( (char = stack.pop()) != "(") {
        parenStack.unshift(char);
      }
      stack.push(processStack(parenStack).pop());
    } else {
      stack.push(parseInt(char));
    }
  };
  //var tokens = str.match(/d+|[()+-*/]/g);
  var tokens = str.match(/\d+|[()+\-*/]/g);
  for(var i = 0; i < tokens.length; i++) {
    processChar(tokens[i]);
    lastToken = tokens[i];
  }
  stack = processStack(stack);
  return stack.pop();
}
