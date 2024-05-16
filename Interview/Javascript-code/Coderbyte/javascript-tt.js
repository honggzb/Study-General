for(var i=0; i<3;i++) {
    setTimeout(function() {alert(i);}, 1000 +i)
}

function m(a) {
    return function(b) {
        return function(c) {
            return a*b*c;
        }
    }
}

