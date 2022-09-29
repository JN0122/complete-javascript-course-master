'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ starterIndex, mainIndex, time, addreess }) {
    console.log(
      `Order recived! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${addreess} at ${time}`
    );
  },

  orderPasta: function (ingrediants) {
    console.log(`Here is your pasta with 3 ingrediants`, ...ingrediants);
  },

  orderPizza: function (mainIngredient, ...otherIngrediants) {
    console.log(mainIngredient, otherIngrediants);
  },
};

// restaurant.orderPizza('mushrooms', 'spinach', 'onions');
// const ingrediants = [
//   prompt('Ingredient 1'),
//   prompt('Ingredient 2'),
//   prompt('Ingredient 3'),
// ];

// restaurant.orderPasta(ingrediants);

// restaurant.orderDelivery({
//   time: '22.30',
//   addreess: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// const arr = [2, 3, 4, 5, 6, 3];
// const [a, , c] = arr;
// console.log(a, c);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // const temp = main;
// // main = secondary;
// // secondary = temp;
// [main, secondary] = [secondary, main];

// console.log(main, secondary);

// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, 'and', mainCourse);

// const nested = [2, 4, [5, 6]];

// const [first, , [x, y]] = nested;
// console.log(first, x, y);

// //
// const [p = 1, q = 1, r = 1] = [8, 0, 3];
// console.log(p, q, r);

////////////

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
//   menu = [],
// } = restaurant;
// console.log(restaurantName, hours, tags, menu);

// // Mutating object
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };

// ({ a, b } = obj);
// console.log(a, b);

// // Nested objects
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// const arr = [1, 2, 3];
// const newArray = [1, 2, ...arr];
// console.log(newArray);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// const mainMenuCopy = [...restaurant.mainMenu, ...newMenu];
// console.log(mainMenuCopy);

// const str = 'Jonas';
// console.log(...str, ' ', 'S');

// const restaurant2 = {
//   ...restaurant,
//   founder: 'Guiseppe',
//   foundingYear: 1990,
// };

// console.log(restaurant2);

// const [a, b, ...others] = arr;
// console.log(a, b, others);

// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);

// const add = function (...numbers) {
//   let sum = 0;

//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };

// add(1, 2, 3, 4, 5, 6);

// spread functions

// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };

// add(1, 2, 3, 4, 5);

// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('mushrooms');

// || any datatype
// shortcircuit - if first value is truthy return this value else return next truthy value or last element
// console.log(3 || 'Jonas');
// console.log('' || 'Jonas'); // 'Jonas'
// console.log(true || 0); // true
// console.log(undefined || null); // null

// console.log(undefined || null || 0 || 'Hello' || 23 || null); // Hello

// restaurant.numGuests = 0;

// const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guest1);

// const guest2 = restaurant.numGuests || 23;
// console.log(guest2);

// console.log('---- AND -----');

// also can return anything
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');
// console.log(3 && 'Hello' && undefined);

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('Mushrooms', 'Spinach');
// }
// restaurant.orderPizza && restaurant.orderPizza('Mushrooms', 'Spinach');

// -------NULLISH OPERATOR-------
// Nullish values: null, undefined (not 0, '')
// restaurant.numGuests = 0;

// const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guest1);

// const guest2 = restaurant.numGuests ?? 23;
// console.log(guest2);

// const rest1 = {
//   name: 'Capri',
//   // numGuest: 20,
//   numGuest: 0,
// };
// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovani Rossi',
// };

// // rest1.numGuest = rest1.numGuest || 10;
// // rest2.numGuest = rest2.numGuest || 10;

// // ------logical assigment operator or------
// // works on truthy values
// rest1.numGuest ||= 10;
// rest2.numGuest ||= 10;

// // ------logical assigment operator nullish------
// // nullish - works on nullish values
// rest1.numGuest ??= 10;
// rest2.numGuest ??= 10;

// // ------logical assigment operator and------
// rest1.owner = rest1.owner && 'anonymous';
// rest2.owner = rest2.owner && 'anonymous';
// rest1.owner &&= 'anonymous';
// rest2.owner &&= 'anonymous';

// console.log(rest1);
// console.log(rest2);

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')

6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)

7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/////////////////////////////////////////////////////////////////////////////////////////
// Coding Challange #2

// for (const [index, player] of game.scored.entries()) {
//   console.log(`Goal ${index + 1}: ${player}`);
// }

// let avg = 0;
// const odds = Object.values(game.odds);
// for (const odd of odds) {
//   avg += odd;
// }
// avg /= odds.length;
// console.log(`Average odd: ${avg}`);

// for (const [teamName, odd] of Object.entries(game.odds)) {
//   console.log(
//     `Odd of ${teamName === 'x' ? 'draw' : 'victory ' + game[teamName]}: ${odd}`
//   );
// }

// game.scorers = {};

// for (const playerName of game.scored) {
//   game.scorers[playerName]
//     ? (game.scorers[playerName] += 1)
//     : (game.scorers[playerName] = 1);
// }

// console.log(game.scorers);

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////
// coding challange #1

// const [players1, players2] = game.players;

// const [gk, ...fieldPlayers] = players1;
// // console.log(gk, fieldPlayers);

// const allPlayers = [...players1, ...players2];
// // console.log(allPlayers);

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// // console.log(players1Final);

// const { team1, x: draw, team2 } = game.odds;
// // console.log(team1, draw, team2);

// const printGoals = function (...players) {
//   const Goals = {};

//   game.scored.forEach(playerScored => {
//     Goals[playerScored] &&= Goals[playerScored] + 1;
//     Goals[playerScored] ??= 1;
//   });

//   players.forEach(player => {
//     console.log(player, ' ', Goals[player] ?? 0);
//   });
// };

// // printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// // console.log((team1 < team2 && 'Team 2 won!') || 'Team 1 won!');
/////////////////////////////////////////////////////////////////////////////////////////

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);

// for (const [index, item] of menu.entries()) {
//   console.log(`${index + 1}: ${item}`);
// }

// const openDays = ['mon', 'fri', 'sat'];

// const openingHours = {
//   [`day-${1 + 3}`]: {
//     open: 12,
//     close: 20,
//   },
// };

// const openingHours2 = {
//   openingHours,
//   name: 'Pizzeria Mario',
//   // printHours: function () {
//   //   console.log(`sat: ${openingHours.sat.open} - ${openingHours.sat.close}`);
//   // },

//   printHours() {
//     console.log(`sat: ${openingHours.sat.open} - ${openingHours.sat.close}`);
//   },
// };

// // console.log(openingHours2);

// // openingHours2.printHours();

// if (restaurant.openingHours && restaurant.openingHours.mon) {
//   console.log(restaurant.openingHours.mon.open);
// }

// // optional chaining
// console.log(restaurant.openingHours?.mon?.open);

// // console.log(restaurant.openingHours.mon.open);

// const weekDays = ['mon', 'fri', 'sat'];

// for (const day of weekDays) {
//   console.log(
//     `On ${day} we open at ${restaurant.openingHours[day]?.open ?? '----'}`
//   );
// }

// // optional chaining methods
// restaurant.risotto?.(0, 1) ?? console.warn('Method does not exists!');

// // on arrays
// const users = [
//   {
//     name: 'Jonas',
//     email: 'jonas@onet.pl',
//   },
// ];

// console.log(users[1]?.name ?? 'User not found!');

// const properties = Object.keys(restaurant.openingHours);
// console.log(properties);

// let openStr = 'We are open on: ';
// for (const day of Object.keys(restaurant.openingHours)) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// console.log(Object.values(restaurant.openingHours));

// const days = Object.entries(restaurant.openingHours);

// for (const [key, { open, close }] of days) {
//   console.log(`On ${key} we are open at ${open} and close at ${close}`);
// }

// Set - array with no duplicates
const orderSet = new Set(['Pasta', 'Pizza', 'Risotto', 'Pizza', 'Pasta']);

// console.log(orderSet);

// console.log(new Set('Jonas'));
// console.log(new Set());
// console.log(orderSet.size);
// console.log(orderSet.has('Pizza'));
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
orderSet.delete('Pizza');
// console.log(orderSet);
// orderSet.clear();

// for (const order of orderSet) {
//   console.log(order);
// }

// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// let staffUnique = [...new Set(staff)];
// console.log(staffUnique);

// const rest = new Map();

// rest
//   .set('name', 'Classico Italiano')
//   .set(1, 'Firenze, Italy')
//   .set('open', '11')
//   .set('close', '23');
// console.log(rest.set(2, 'Lisbon, Portugal'));
// rest.set(true, 'We are opened!').set(false, 'We are closed :c');

// console.log(rest.get(true));
// console.log(rest.get('1'));

// const time = 24;

// console.log(rest.get(time >= rest.get('open') && time <= rest.get('close')));

// console.log(rest.has('adam'));
// console.log(rest.delete(2));
// console.log(rest);
// rest.clear();
// // console.log(rest.size);

// const arr = [1, 2];

// // rest.set([1, 2], 'saga');
// rest.set(arr, 'saga');
// // console.log(rest.get([1, 2])); // not work
// // console.log(rest.get(arr));

// // console.log(rest.set(document.querySelector('h1'), 'Heading'));

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);
// console.log(question);

// Object to map
// console.log(Object.entries(restaurant.openingHours));

// const hours = new Map(Object.entries(restaurant.openingHours));
// console.log(hours);
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === typeof 1) {
//     console.log(`Answer ${key}: ${value}`);
//   }
// }
// const answer = Number(prompt('Your answear'));

// console.log(question.get(answer === question.get('correct')));

// Convert map to array

// console.log([...question]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

//////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// const events = new Set(gameEvents.values());
// console.log([...events]);

// gameEvents.delete(64);
// console.log(gameEvents);

// const avgEventMinute = 90 / gameEvents.size;
// console.log(`An event happened, on average, every ${avgEventMinute} minutes`);

// for (const [minute, event] of gameEvents) {
//   const half = minute < 45 ? 'FIRST' : 'SECOND';
//   console.log(`[${half} HALF] ${minute}: ${event}`);
// }

const airline = 'TAP Air Portugal';
const plane = 'A320';

// console.log(airline[0]);
// console.log('B737'[2]);
// console.log(airline.length);

// console.log(airline.indexOf('r'));
// console.log(airline.lastIndexOf('r'));
// console.log(airline.indexOf('Portugal'));
// console.log(airline.indexOf('portugal'));

// console.log(airline.slice(4));
// console.log(airline.slice(4, 7));

// console.log(airline.slice(0, airline.indexOf(' ')));
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// console.log(airline.slice(-2));
// console.log(airline.slice(1, -1));

// const checkMiddleSeat = function (seat) {
//   // B and E middle seats
//   const s = seat.slice(-1);
//   if (s === 'E' || s === 'B') {
//     console.log('Middle seat!');
//   } else {
//     console.log('Not a middle seat!');
//   }
// };

// checkMiddleSeat('11B');

// console.log(new String('Lineczka'));
// console.log(typeof new String('Lineczka'));

// console.log(typeof new String('Lineczka').slice(0));

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// // Fix capitalization in name

// const corectPassengerName = name => {
//   const nameLower = name.toLowerCase();
//   return nameLower[0].toUpperCase() + nameLower.slice(1);
// };

// const passenger = 'joNaS';

// console.log(corectPassengerName(passenger));

// const email = 'hello@jonas.io';
// const loginEmail = '  Hello@jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();

// console.log(trimmedEmail);

// const normalizedEmail = loginEmail.toLowerCase().trim();
// // .trimStart(), .trimEnd()
// console.log(normalizedEmail === email);

// const priceGB = '288,97£';
// const priceUS = priceGB.replace('£', '$').replace(',', '.');
// console.log(priceUS);

// const announcement =
//   'All passangers come to boarding door 23. Boarding door 23!';

// // console.log(announcement.replaceAll('door', 'gate'));
// console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replace(/door/g, 'gate'));

// // Booleans
// const plane2 = 'Airbus A320neo';
// console.log(plane2.includes('A320'));
// console.log(plane2.includes('Boeing'));
// console.log(plane2.startsWith('Air'));

// if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
//   console.log('Part of the new Airbus family!');
// }

// // Practice
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();

//   if (baggage.includes('knife') || baggage.includes('gun'))
//     console.log('You are NOT allowed on board');
//   else console.log('Welcome aboard!');
// };

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Soccks and camera');
// checkBaggage('Got some snacks and a gun for protection');

// console.log('a+very+nice+string'.split('+'));
// console.log('Jonas Schmedtmann'.split(' '));

// const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
// console.log(firstName, lastName);

// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// const passenger = 'jessica ann smith davis';

// const capitalizeName = name => {
//   const nameArr = name.split(' ');
//   const nameUpper = [];
//   for (const n of nameArr) {
//     n[0] && nameUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }

//   console.log(nameUpper.join(' '));
// };

// capitalizeName(passenger);
// capitalizeName('jonas schmedtmann');
// capitalizeName('my ');

// // Padding string
// const message = 'Go to gate 23!';
// console.log(message.padStart(25, '+'));
// console.log('Jonas'.padStart(25, '+').padEnd(35, '+'));

// const maskCreditCard = function (number) {
//   const string = String(number);
//   console.log(string.slice(-4).padStart(string.length, '*'));
// };

// maskCreditCard(433723423424234);
// maskCreditCard('32434234234242604');

// // Repeat
// const message2 = 'Bad weather... All Departures Delayed... ';
// console.log(message2.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
// };

// planesInLine(4);
// planesInLine(10);

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀


document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const convertToCamelCase = varname => {
  const varnameArr = varname.toLowerCase().split('_');

  for (let i = 1; i <= varnameArr.length - 1; i++) {
    const item = varnameArr[i];
    varnameArr[i] &&= item.replace(item[0], item[0].toUpperCase());
  }

  return varnameArr.join('');
};

const printCamelCase = function (text) {
  const textArr = text.split('\n');
  for (let i = 0; i < textArr.length; i++) {
    const textCamelCase = convertToCamelCase(textArr[i].trim());
    console.log(textCamelCase.padEnd(20), '✅'.repeat(i + 1));
  }
};

const button = document.querySelector('button');
button.addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  printCamelCase(text);
});
*/

///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = text => text.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  let output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(45);
  console.log(output);
}
