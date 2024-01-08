/*Using the JavaScript language, have the function BracketMatcher(str)
take the str parameter being passed and return 1 if the brackets are correctly
matched and each one is accounted for. Otherwise return 0. For example: if str is
"(hello (world))", then the output should be 1, but if str is "((hello (world))" the the output should be 0 because 
the brackets do not correctly match up. Only "(" and ")" will be used as brackets. If str contains no brackets return 1.

"(coder)(byte)" -> output 0
"(c(oder))(b(yte)" -> output 1
if str contains no brackets -> output 1
********************************************************/

function bracketMatcher(str) {
    const stack = [];
    for(let i=0; i<str.length; i++) {
        if(str[i] === '(') {
            stack.push(str[i]);
        } else if(str[i] === ')'){
            if(stack.length === 0) {
                return 0;
            } else {
                stack.pop();
            }
        }
    }
    return stack.length === 0 ? 1 : 0;
}

/********************************************************/

function BracketMatcher(str){
    var left=0;
    var right=0;
    for(var i=0; i<str.length; i++){
        if(str[i]==="("){
            left++;
        }
        else if(str[i]===")"){
            right++;
        }
    }
if(right===left){
    return 1;
  }
    else{
      return 0;
    }
}
