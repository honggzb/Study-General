/*
check nested HTML element is matched
"helol" --> true
"" --> div
"avc test test test" --> i
*/

function HTMLElements(str) {
    let stack = [];
    for(let i=0;i<str.length;i++) {
        if(str[i] === '<' && str[i+1] !== "/") {
            let end = str.indexOf('>', i);
            let tag = str.slice(i+1, end);
            stack.push(tag);
            i = end;
        }else if(str[i] === '<' && str[i+1] === '/') {
            let end = str.indexOf('>', i);
            let tag = str.slice(i+2, end);
            let top = stack.pop();
            if(top != tag) {    //if tag do not match, return the expected tag
                return top;
            }
            i = end;
        }
    }
    if(stack.length > 0) {
        return stack.pop();
    } else {
        return "true";
    }
}
