// function to convert a number to a roman numeral, if num = 4, return IV
function convertToRoman(num) {
    // create an array of roman numerals
    var romanNumerals = ["I", "V", "X", "L", "C", "D", "M"];
    // create an array of numbers
    var numbers = [1, 5, 10, 50, 100, 500, 1000];
    // create an empty array to hold the roman numerals
    var romanNumeralArray = [];
    // create an empty string to hold the roman numerals
    var romanNumeralString = "";
    // loop through the numbers array
    for (var i = 0; i < numbers.length; i++) {
        // if the number is greater than or equal to the current number in the numbers array
        if (num >= numbers[i]) {
        // push the roman numeral equivalent to the romanNumeralArray
        romanNumeralArray.push(romanNumerals[i]);
        // subtract the current number from the number passed in
        num -= numbers[i];
        // decrement i so that the loop will start over at the current index
        i--;
        }
    }
    // join the romanNumeralArray into a string
    romanNumeralString = romanNumeralArray.join("");
    // return the romanNumeralString
    return romanNumeralString;
}
