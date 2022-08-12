'use strict';

// Scope
/*
const CURRENT_YEAR = 2022;

function calcAge(birthYear) {
  const age = CURRENT_YEAR - birthYear;

  function printAge() {
    console.log(`${firstName}, you are ${age}, born in ${birthYear}.`);
  }

  printAge();

  return age;
}

const firstName = 'Kuba';
console.log(calcAge(2001));
// printAge();
*/

// Hoisting and TDZ
/* 

//variables
// console.log(me);
// console.log(job);
// console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

//Functions

// console.log(addDecal(1, 2));
// console.log(addExpr(1, 2));
// console.log(addArrow(1, 2));

function addDecal(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

//example

if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All product deleted!');
}
*/

// this keyword

// console.log(this);

// const calcAge = function () {
//   console.log(this);
// };
// calcAge();

// const calcAgeArrow = () => {
//   console.log(this);
// };
// calcAgeArrow();

// const jonas = {
//   year: 13,
//   job: 'teacher',
//   displayJob: () => {
//     console.log(this.job);
//     // cause arrow functions does not have keyword this
//   },
//   displayYear: function () {
//     console.log(this.year);
//   },
//   // Better use arrow function

//   // calcAge: function () {
//   //   const self = this;
//   //   const isMillenial = function () {
//   //     console.log(self.year >= 20 ? 'Millenial' : undefined);
//   //   };
//   //   isMillenial();
//   // },
//   calcAge: function () {
//     const isMillenial = () => {
//       console.log(this.year >= 20 ? 'Millenial' : undefined);
//     };
//     isMillenial();
//   },
// };
// jonas.displayJob();
// jonas.displayYear();

// const adam = {
//   year: 26,
// };

// // method borrowing
// adam.displayYear = jonas.displayYear;

// adam.displayYear();

// jonas.calcAge();

// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// addExpr(2, 3);
// addExpr(1, 3, 2);

// const addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(1, 2, 34);

// Primitives and objects

let age = 30;
let oldAge = age;

age = 31;

// console.log(age);
// console.log(oldAge);

const me = {
  name: 'Kuba',
  age: 30,
};

const friend = me;

friend.age = 20;

// console.log('me:', me);
// console.log('friend:', friend);

// problem with chaanging data
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Adam', 'Marek'],
};

// const marriedJessica = jessica;
// marriedJessica.lastName = 'Davis';

// console.log(marriedJessica);
// console.log(jessica);

// copying object

const marriedJessica2 = Object.assign({}, jessica);
marriedJessica2.lastName = 'Davis';
marriedJessica2.family.push('Jarek', 'Krzysiek');

console.log(jessica);
console.log(marriedJessica2);

// OBJECT ASSIGN ONLY WORKS WITH FIRST LEVEL COPYING (object in object)
