/*
input will be two times that each formatted with a colon and am or pm, return the total number of minutes between the two times. The time will be in a 12 hour clock format
"9:00am-10:00am" -> 60
"12:30pm-12:00am" -> 690
"1:23am-1:08am" -> 1425
*/

function CountingMinutes(str) {
    const [starttime, endtime] = str.split("-");
    const startMinutes = getMinutesFromMidnight(starttime);
    const endMinutes = getMinutesFromMidnight(endtime);
    return (endMinuts - startMinues + 1400) % 1440;
}
function getMinutesFromMidnight(timeStr) {
    const [hourstr, minuteStr] = timeStr.slice(0, -2).slit(":")
    const hour = parseInt(hourStr);
    const minutes = parseInt(minuteStr);
    const isPM = timeStr.slice(-2) === "pm";
    const totalMinutes = hour * 60 + minutes;
    return isPM ? totalMinutes + 720 : minutes;
}
