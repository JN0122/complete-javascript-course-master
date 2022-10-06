'use strict';

/*
const bookings = [];

const createBooking = function (
  flightNum,
  passengersNum = 1,
  price = 199 * passengersNum
) {
  //   passengersNum ||= 1;
  //   price ||= 199;

  const booking = {
    flightNum,
    passengersNum,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123', 3);
createBooking('LH123', 7, 700);
createBooking('LH123', 7);
createBooking('LH123', undefined, 300);
*/

/*
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmidtmann',
  passport: 23421213423,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 23421213423) {
    alert('Checked in!');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
const flightNum = flight;
const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(jonas);
checkIn(flight, jonas);
console.log(jonas);
*/
/*
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

// console.log(oneWord('adam ma Dupe'));
// console.log(upperFirstWord('adam ma Dupe'));
transformer('Javascript is the best!', upperFirstWord);
console.log('\n\n');
transformer('Javascript is the best!', oneWord);
*/
/*
const greet = function (greeting) {
  return function (name) {
    console.log(greeting, name);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Kuba');

greet('Hello')('Jonas');

const greet2 = greeting => name => console.log(greeting, name);

greet2('Witaj')('Michale');

*/
/*
const lufthansa = {
  airline: 'Lufthansa',
  iatacode: 'LH',
  bookings: [],
  // book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iatacode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Kuba');
lufthansa.book(111, 'Marek');

const eurowings = {
  name: 'Eurowings',
  iatacode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does not work
// book(23, 'Madzia');

book.call(eurowings, 23, 'Sara Williams');

book.call(lufthansa, 40, 'Adam');
console.log(lufthansa.bookings);

const swiss = {
  airline: 'Swiss Air Line',
  iatacode: 'LX',
  bookings: [],
};

book.call(swiss, 10, 'Laura');

// Apply
const flightData = [583, 'George'];
book.apply(swiss, flightData);
console.log(swiss);
// book.call(swiss, ...flightData);      - the same

// Bind
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(555, 'Mirek');
console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23);

bookEW23('Marta');
bookEW23('Bartek');

// With Event Listeners
lufthansa.plane = 300;

lufthansa.buyPlane = function () {
  console.log(this, this.plane);
  this.plane++;
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
/*
const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(3211));
*/
/*
const addTax = rate => value => value + value * rate;
const addVAT = addTax(0.23);

console.log(addTax(0.1)(320));
console.log(addVAT(320));
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}.`);
    }
  },
  registerNewAnswer() {
    const number = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    if (!isNaN(number) && number >= 0 && number < this.options.length) {
      this.answers[number]++;
    } else {
      console.log('Please provide correct number!');
    }
    this.displayResults();
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const bounusData = {
  answers: [5, 2, 3],
  //   answers: [1, 5, 3, 9, 6, 1],
};

poll.displayResults.call(bounusData, 'string');
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
*/

/*
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
})();

(() => console.log('This will never run again'))();
*/
/*
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(passengerCount, ' passengers');
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// Example 1
console.dir(booker);

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;

  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

h();
f();

console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} `);
};

const perGroup = 123;
boardPassengers(180, 3);
*/
///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  const body = document.querySelector('body');
  body.addEventListener('click', () => (header.style.color = 'blue'));
})();
