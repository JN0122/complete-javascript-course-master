// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const temps1 = [1, -6, 5, 10, 19, 23, 'error', 10, 3];
// const temps2 = [1, -20, 5, 10, 19, 23, 'error', 10, 80];

// const temps = temps1.concat(temps2);

// const calcTempAmplitude = function (temps) {
//   let maxTemp = temps[0];
//   let minTemp = temps[0];
//   for (let i = 0; i < temps.length; i++) {
//     const currentTemp = temps[i];
//     if (typeof currentTemp !== 'number') continue;
//     if (currentTemp > maxTemp) maxTemp = currentTemp;
//     else if (currentTemp < minTemp) minTemp = currentTemp;
//   }
//   console.log(maxTemp - minTemp);
// };

// console.log(temps);
// calcTempAmplitude(temps);

// const convertToKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     value: Number(prompt('Degrees celsius: ')),
//   };

//   console.table(measurement);

//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// console.log(convertToKelvin());

/*

Given an array of forecasted maximum temperatures, the thermometer displays a
string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1
days ... 21ºC in 2 days ... 23ºC in 3 days ..."
Your tasks:
1. Create a function 'printForecast' which takes in an array 'arr' and logs a
string like the above to the console. Try it with both test datasets.
2. Use the problem-solving framework: Understand the problem and break it up
into sub-problems!
Test data:
§ Data 1: [17, 21, 23]
§ Data 2: [12, 5, -5, 0, 4]

*/

// - create a function that takes array as an parameter
// - create for loop for the array
// - prepare the string to print

const printForecast = arr => {
  if (typeof arr != 'object') return -1;

  let textToPrint = '';

  for (let i = 0; i < arr.length; i++) {
    textToPrint += `${arr[i]}ºC in ${i + 1} days... `;
  }
  return textToPrint;
};

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

console.log(printForecast(data1));
console.log(printForecast(data2));
