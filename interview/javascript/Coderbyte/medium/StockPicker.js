/*
return the maximum profit that on day x and selling stock on day y where y > x
If there is not profit that could have been made with the stock prices, then your program should return -1

[44, 30, 24, 32, 35, 30, 40, 38, 15] -> 16
[10, 12, 4, 5, 9] -> 5
[14, 20, 4, 12, 5, 11] -> 8
[10, 9, 8, 2] -> -1

*/
  
function StockPicker(str) {
    var profit=-1; // Initialize the maximum profit to -1
    var buyPrice=arr[0]; // Initialize the buying price to the first element of the array
    for(var i=1; i<arr.length; i++){ // Loop through the array starting from the second element
        if(arr[i]<buyPrice){ // If the current element is smaller than the buying price
            buyPrice=arr[i]; // Update the buying price
        }
        else if( (arr[i]-buyPrice) > profit){ // If selling the stock at the current price will give a greater profit than the previous maximum profit
            profit=arr[i]-buyPrice; // Update the maximum profit
        }
    }
  return profit; // Return the maximum profit 
}
