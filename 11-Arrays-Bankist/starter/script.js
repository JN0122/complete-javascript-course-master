'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (val, i) {
    const depositType = val > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${depositType}">${
      i + 1
    } ${depositType}</div>
                    <div class="movements__date"></div>
                    <div class="movements__value">${val}€</div>
                  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const deposits = acc.movements.filter(val => val > 0);
  const incomes = deposits.reduce((acc, val) => acc + val, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = -acc.movements
    .filter(val => val < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOut.textContent = `${outcomes}€`;

  const interest = deposits
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter(val => val >= 1)
    .reduce((acc, val) => acc + val, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

const createUsernames = accounts =>
  accounts.forEach(account => {
    account.userName = account.owner
      .split(' ')
      .map(name => name.at(0))
      .join('')
      .toLowerCase();
  });

createUsernames(accounts);

// Event hamdlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(' ')
      .at(0)}`;

    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);

    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const i = accounts.findIndex(
      acc => acc.userName === inputCloseUsername.value
    );

    inputClosePin.value = inputCloseUsername.value = '';
    containerApp.style.opacity = 0;

    accounts.splice(i, 1);
  }
});

let sorted = false;
btnSort.addEventListener('click', function () {
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));

console.log(arr.slice());
console.log([...arr]);

// splice
// console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2); // (position, delCount)
console.log(arr);

// reverse
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// concat

const letters = arr.concat(arr2);
console.log(letters);

// join
console.log(letters.join(', '));

*/

/*
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('Jonas'.at(-1));
*/
/*
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${-movement}`);
  }
}

console.log('\n\n');

movements.forEach(function (movement, i) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${-movement}`);
  }
});
*/
/*
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// set
const currenciesUnique = new Set(['USD', 'EUR', 'DOL', 'EUR', 'USD']);

console.log(
  currenciesUnique.forEach(function (value, _, set) {
    console.log(`${value}: ${_}`);
  })
);
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

// const dogsKate = [10, 5, 6, 1, 4];
// const dogsJulia = [9, 16, 6, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaWithoutCats = dogsJulia.slice(1, -2);
  const dogs = dogsJuliaWithoutCats.concat(dogsKate);

  // console.log(dogs);

  dogs.forEach(function (val, i) {
    console.log(
      `Dog number ${i + 1} is ${
        val >= 3 ? `an adult, and is ${val} years old` : `still a puppy 🐶`
      }`
    );
  });
};

checkDogs(dogsJulia, dogsKate);
*/
/*
const eurToUsd = 1.1;
const movementsUSD = movements.map(val => val * eurToUsd);

const movementsUSD2 = [];
for (const mov of movements) {
  movementsUSD2.push(mov * eurToUsd);
}

console.log(movements);
console.log(movementsUSD);
console.log(movementsUSD2);

const movementsDescription = movements.map(
  (val, i) =>
    `Movement ${i + 1}: You ${
      val > 0 ? `deposited ${val}` : `withdrew ${-val}`
    }`
);

console.log(movementsDescription);
*/
/*
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) {
  mov > 0 && depositsFor.push(mov);
}
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/
/*
const balance = movements.reduce((acc, mov, i, arr) => acc + mov, 0);
// console.log(balance);

// Max value
const maxValue = movements.reduce((acc, mov) => {
  if (mov > acc) return mov;
  return acc;
});

const minValue = movements.reduce((acc, mov) => {
  if (mov < acc) return mov;
  return acc;
});

console.log(movements);
console.log(maxValue);
console.log(minValue);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


const calcAverageHumanAge = function (ages) {
  const dogsHumanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(dogsHumanAge);
  const adultDogs = dogsHumanAge.filter(age => age >= 18);
  console.log(adultDogs);
  const avg = adultDogs.reduce((acc, age) => acc + age) / adultDogs.length;
  console.log(`Avg dog age in human years: ${Math.trunc(avg)}`);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/
/*
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov);

console.log(totalDepositsUSD);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
/*
console.log(movements);
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

const findUser = function (name) {
  for (const account of accounts) {
    if (account.owner === name) return account;
  }
  return null;
};
console.log(findUser('Jessica Davis'));
*/
/*
// Some
console.log(movements);
console.log(movements.includes(-130));

console.log(movements.some(mov => mov > 1500));

// Every
console.log(account4.movements.every(mov => mov > 0));

// separate callback

const deposit = mov => mov > 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));
 */
/*
const arr = [[1, 2, 3], [4, 6, 7], 8, 9];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [6, 7]], 8, 9];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// console.log(allMovements.reduce((acc, mov) => acc + mov, 0));

// flat
const allMovements = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(allMovements);

// flatMap
const allMovements2 = accounts
  .flatMap(acc => acc.movements) // only 1 level deep inside array
  .reduce((acc, mov) => acc + mov, 0);
console.log(allMovements);
*/
/*
const owners = accounts.map(acc => acc.owner);
console.log(owners.sort());
console.log(owners);

console.log(movements);

// return < 0, A,B (keep order)
// return > 0, B,A (switch order)

// ASCending
// console.log(
//   movements.sort((a, b) => {
//     if (a > b) return 1;
//     else if (b > a) return -1;
//   })
// );
console.log(movements.sort((a, b) => a - b));

// DESCending
// console.log(
//   movements.sort((a, b) => {
//     if (a > b) return -1;
//     else if (b > a) return 1;
//   })
// );
console.log(movements.sort((a, b) => b - a));
*/
/*
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x);
console.log(x.map(() => 5));

console.log(x.fill(5, 3, 4));
console.log(arr.fill(23, 2, 5));

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value')
  ).map(el => el.textContent.replace(/€| /g, ''));
  console.log(movementUI);
});
*/

///////////////////////////////////////
// Array Methods Practice
/*
// 1.
const depositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(val => val > 0)
  .reduce((sum, val) => sum + val, 0);
console.log(depositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(val => val >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, val) => (val >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

let a = 10;
console.log(a++);
// console.log(++a);
console.log(a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, val) => {
      // val > 0 ? (sums.deposits += val) : (sums.withdrawals += val);
      sums[val > 0 ? 'deposits' : 'withdrawals'] += val;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits);
console.log(withdrawals);

// 4.
// this is a nice title  -> This Is a Nice Title

const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'and', 'or', 'on', 'in', 'with'];
  const capitalize = sentence =>
    sentence.at(0).toUpperCase() + sentence.slice(1);

  return capitalize(
    title
      .toLowerCase()
      .split(' ')
      .map(word => (exceptions.includes(word) ? word : capitalize(word)))
      .join(' ')
  );
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is The title with an EXAMPLE'));
*/
///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA: */
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  // { weight: 8, curFood: 133, owners: ['Sarah'] },
];
/*
GOOD LUCK 😀
*/
const eatingType = [`too litle`, `ok`, `too much`];

const calcRecomendedFoodAndEatingType = function (dogs) {
  const tooMuchPercent = 1.1;
  const tooLittlePercent = 0.9;

  dogs.forEach(dog => {
    dog.recomendedFood = Math.trunc(dog.weight ** 0.75 * 28);

    const dogEatingType = function (dog) {
      if (dog.curFood <= dog.recomendedFood * tooLittlePercent)
        return eatingType[0];
      if (dog.curFood >= dog.recomendedFood * tooMuchPercent)
        return eatingType[2];
      return eatingType[1];
    };

    dog.eatingType = dogEatingType(dog);
  });
};
calcRecomendedFoodAndEatingType(dogs);

const checkOwnerDogs = function (dogs, owner) {
  dogs
    .filter(dog => dog.owners.includes(owner))
    .forEach(dog => {
      console.log(`${owner}'s dog is eating ${dog.eatingType}.`);
    });
};
checkOwnerDogs(dogs, 'Sarah');

const [ownersEatTooLittle, ownersEatOk, ownersEatTooMuch] = dogs.reduce(
  (owners, dog) => {
    const i = eatingType.indexOf(dog.eatingType);
    dog.owners.forEach(owner => {
      owners[i].push(owner);
    });
    return owners;
  },
  [[], [], []]
);

console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
console.log(`${ownersEatOk.join(' and ')}'s dogs eat ok!`);
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);

console.log(dogs.some(dog => dog.curFood === dog.recomendedFood));

const eatingOk = dog => dog.eatingType === eatingType[1];

console.log(dogs.some(eatingOk));
console.log(dogs.filter(eatingOk));

console.log(dogs.slice().sort((a, b) => a.recomendedFood - b.recomendedFood));
