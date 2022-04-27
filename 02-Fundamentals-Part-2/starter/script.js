'use strict';


// // function calcAge(birthYear){
// //     return 2022 - birthYear
// // }

// const age1 = calcAge(2001);


// const calcAge2 = function (birthYear){
//     return 2022 - birthYear
// }

// // console.log(calcAge2(2001));

// const calcAge3 = birthYear => 2022 - birthYear;

// // console.log(calcAge3(2001));

// // const yearsUntilRetirement = (birthYear,firstName) => {
// //     const age = 2022 - birthYear;
// //     const retirement = 65 - age;
// //     // return retirement;
// //     return `${firstName} retires in ${retirement} :C`;
// }

// // console.log(yearsUntilRetirement(2001,'Adam'));



// function cutFruitPieces(friuit){
//     return friuit * 4;
// }

// function fruitProcessor(apples, oranges){
//     const applePieces = cutFruitPieces(apples);
//     const orangePieces = cutFruitPieces(oranges);

//     return `Juice with ${orangePieces} orange pieces and ${applePieces} apple pieces.`;
// }

// console.log(fruitProcessor(2,5));


// function calcAge(birthYear){
//     return 2022 - birthYear
// }

// const yearsUntilRetirement = function (birthYear,firstName){
//     const age = calcAge(birthYear);
//     const retirement = 65 - age;

//     if(retirement > 0) return retirement;
//     else return -1;

//     // return `${firstName} retires in ${retirement} :C`;
// }

// console.log(yearsUntilRetirement(1930,"Adam"));

/*
Coding Challenge #1
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new
gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so
one average score per team).
A team only wins if it has at least double the average score of the other team.
Otherwise, no team wins!
Your tasks:
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team
as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner
to the console, together with the victory points, according to the rule above.
Example: "Koalas win (30 vs. 13)"
4. Use the 'checkWinner' function to determine the winner for both Data 1 and
Data 2
5. Ignore draws this time
Test data:
§ Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
§ Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
*/

// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3)/3;

// let avgDolhins = calcAverage(44, 23, 71);
// let avgKoalas = calcAverage(65, 54, 49);

// function checkWinner(avgDolhins, avgKoalas){
//     if(avgDolhins >= avgKoalas*2){
//         return `Dolphins won (${avgDolhins} vs ${avgKoalas})`;
//     }
//     else if(avgDolhins*2 <= avgKoalas){
//         return `Koalas won (${avgKoalas} vs ${avgDolhins})`;
//     }
// }

// console.log(checkWinner(avgDolhins, avgKoalas));

// avgDolhins = calcAverage(85, 54, 41);
// avgKoalas = calcAverage(23, 34, 27);

// console.log(checkWinner(avgDolhins, avgKoalas));

// const friends = ['Adam','Marek','Michał'];
// const years = new Array(2001,2002,1980,1999);

// const array1 = ["adaam", friends]

// console.log(array1);
// console.log(years.length);


// const calcAge = (birthAge) => 2022 - birthAge;

// const ages = years.map(x => x === 1999 ? calcAge(x) : undefined);

// console.log(ages);

// const newLength = friends.push('Fabian');

// console.log(friends);

// friends.unshift('Marcin');
// console.log(friends)

// const poppedElement = friends.pop(); // remove last element
// console.log(poppedElement, friends);

// friends.shift(); // remove first element
// console.log( friends);


// const adamIndex = friends.indexOf('Bob');
// console.log(adamIndex, friends);

// friends.unshift(23);
// console.log(friends, friends.includes('23'));

/*

Coding Challenge #2
Steven is still building his tip calculator, using the same rules as before: Tip 15% of
the bill if the bill value is between 50 and 300, and if the value is different, the tip is
20%.
Your tasks:
1. Write a function 'calcTip' that takes any bill value as an input and returns
the corresponding tip, calculated based on the rules above (you can check out
the code from first tip calculator challenge if you need to). Use the function
type you like the most. Test the function using a bill value of 100
2. And now let's use arrays! So create an array 'bills' containing the test data
below
3. Create an array 'tips' containing the tip value for each bill, calculated from
the function you created before
4. Bonus: Create an array 'total' containing the total values, so the bill + tip
Test data: 125, 555 and 44
Hint: Remember that an array needs a value in each position, and that value can
actually be the returned value of a function! So you can just call a function as array
values (so don't store the tip values in separate variables first, but right in the new
array) �
GOOD LUCK �

*/

// const bills = [125, 555, 44];
// const tips = [];
// const total = [];

// bills.map(amount => amount >= 50 && amount <= 300 ? tips.push(amount * 0.15) : tips.push(amount * 0.2));

// for (let i = 0; i < bills.length; i++) {
//     total.push(bills[i] + tips[i]);
// }

// console.log(bills, tips, total);

// const person1 = {
//     firstName:"Adam",
//     lastName: 'Szczyrba',
//     birthYear: 1980,
//     friends: ['Marek', 'Michał', "Daniel"],
//     hasDriverLicense: false,

//     calcAge: function () { 
//         this.age = 2022 - this.birthYear
//     },

//     getSummary: function() { 
//         return `${this.firstName} is ${this.age}-years old, and he has ${this.hasDriverLicense ? 'a' : 'no'} driver's license.`
//     }
// };

// // console.log(person1.age, person1['lastName']);

// // const interestedIn = prompt("fastName, firstName, age");
// // if (person1[interestedIn]) console.log(person1[interestedIn]);
// // else console.log('Wrong request!')

// // console.log(`${person1.firstName} has ${person1.friends.length} friends, and his best friend is called ${person1.friends[0]}.`)

// person1.calcAge();
// // console.log(person1['calcAge'](2001))

// console.log(person1.getSummary());


/*

Let's go back to Mark and John comparing their BMIs! This time, let's use objects to
implement the calculations! Remember: BMI = mass / height ** 2 = mass
/ (height * height) (mass in kg and height in meter)
Your tasks:
1. For each of them, create an object with properties for their full name, mass, and
height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same
method on both objects). Store the BMI value to a property, and also return it
from the method
3. Log to the console who has the higher BMI, together with the full name and the
respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m
tall

*/

// const Person1 = {
//     fullName: 'Mark Miller',
//     height: 1.69,
//     weight: 78,

//     calcBMI: function (){
//         this.BMI = (this.weight / this.height**2).toPrecision(4)
//     }
// }
// const Person2 = {
//     fullName: 'John Smith',
//     height: 1.95,
//     weight: 92,

//     calcBMI: function (){
//         this.BMI = (this.weight / this.height**2).toPrecision(4)
//     }
// }

// Person1.calcBMI();
// Person2.calcBMI();

// if(Person1.BMI > Person2.BMI){
//     console.log(`${Person1.fullName}'s BMI (${Person1.BMI}) is higher than ${Person2.fullName}'s (${Person2.BMI})`);
// }
// else if(Person1.BMI < Person2.BMI){
//     console.log(`${Person2.fullName}'s BMI (${Person2.BMI}) is higher than ${Person1.fullName}'s (${Person1.BMI})`);
// }

// for (let i = 1; i <= 10; i++) {
//     console.log(`Lifting weights repetition ${i}`);
// }


