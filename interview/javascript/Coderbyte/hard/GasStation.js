/* 
["n", "g:c", "g:c", "g:c", "g:c"] 

n: number of gas station, 
g: amount of gas, 
c: amount of gallons of gas needed to following gas station

return index of starting gas station that allow u to travel around the whole route once

["4", "1:1", "2:2", "1:2", "0:1"] --> impossible
["4", "0:1", "2:2", "1:2", "3:1"] --> 4

*/
function GasStation(str) {
    var stations = parseInt(str[0]);
    for(let i=0;i<stations;i++) {
        var gas = 0;
        for(let j=0;j<stations;j++) {
            var index = (i + j)% stations +1;
            //split the gas and distance value
            var data = str[index].split(":");
            gas += parseInt(data[0])-parseInt(data[1]);
            //if there is not enough gas to travel to the next station
            if(gas < 0) break;
        }
        //if there is enough gas to travel around the whole route
        if(gas >= 0) {
            return i+1;
        }
    }
    return "impossible";
}
