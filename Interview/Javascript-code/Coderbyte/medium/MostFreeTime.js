/*************************************************************************
*                                                                        *
*  Using the JavaScript language, have the function MostFreeTime(strArr) *
*  read the strArr parameter being passed which will represent a full    *
*  day and will be filled with events that span from time X to time Y in *
*  the day. The format of each event will be hh:mmAM/PM-hh:mmAM/PM.      *
*  For example, strArr may be                                            *
*  ["10:00AM-12:30PM","02:00PM-02:45PM","09:10AM-09:50AM"]. Your program *
*  will have to output the longest amount of free time available         *
*  between the start of your first event and the end of your last event  *
*  in the format: hh:mm. The start event should be the earliest event    *
*  in the day and the latest event should be the latest event in the     *
*  day. The output for the previous input would therefore be 01:30       *
*  (with the earliest event in the day starting at 09:10AM and the       *
*  latest event ending at 02:45PM). The input will contain at least 3    *
*  events and the events may be out of order.                            *
*                                                                        *
*************************************************************************/
* output the longest amount of free timev
* ["10:00AM-12:30PM","02:00PM-02:45PM","09:10AM-09:50AM"] ->
* ["12:15AM-02:30PM","09:00AM-10:00AM","10:30AM-12:00PM"] -> 00:30
* ["12:15AM-02:00PM","09:00AM-12:11PM","02:02PM-04:00PM"] -> 00:04
*************************************************************************/
function MostFreeTime(str) {
    // create an empty array to store the minutes of each event
    var minArr = []
    // create a variable to keep track of the longest free time
    var longest = 0

    // function to convert a time string to minutes
    function timeCalc(time) {
        var min = 0
        // add 12 hours (720 minutes) for pm times
        if(time.match(/pm/i)) {
            min += 720
        }
        // add the hours converted to minutes
        if(time.split(':')[0] !== '12') {
           min += time.split(':')[0] * 60
        } 
        // add the minutes
        min += Number(time.split(':')[1].match(/[0-9][0-9]/)[0])
        return min
    }
    // loop through the array of events and convert each time to minutes
    for(var i = 0; i < strArr.length; i++) {
        var time1 = strArr[i].split('-')[0]
        var time2 = strArr[i].split('-')[1]
        minArr.push([timeCalc(time1), timeCalc(time2)])
    }    
    // sort the array of minutes in ascending order
    minArr.sort(function(a, b) {
        return a[0] - b[0]
    })
    // loop through the sorted array and find the longest free time
    for(var j = 0; j < minArr.length - 1; j++) {
        if(longest < minArr[j + 1][0] - minArr[j][1]) {
            longest = minArr[j + 1][0] - minArr[j][1]
        }
    }
    // convert the longest free time to hours and minutes
    var hours = 0
    while(longest >= 60) {
        longest -= 60;
        hours ++
    }
    // add a leading zero if necessary for single-digit minutes and hours
    if(hours.toString().length === 1) {
        hours = "0" + hours
    }
    if(longest.toString().length === 1) {
        return hours + ":0" + longest
    } else {
        return hours + ":" + longest
    }
}
