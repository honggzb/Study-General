/*
must have a capital letter
must contain at least one number
must contain a punctuation mark or mathematical symbol
cannot have the word 'password'
must be longer than 7 characters and shorter than 31 characters
"turkey90AAA=" --> true
"passWord123!!!" --> false
*/

function SimplePassword(str) {
    if(!/[A-Z]/g.test(str)) return false;
    if(!/[0-9]/g.test(str)) return false;
    if(!/[!=]/g.test(str)) return false;
    if(/password/gi.test(str)) return false;
    if(!(str.length > 7 && str.length <31)) return false;
    return true;
}
