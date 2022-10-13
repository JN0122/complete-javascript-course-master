'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-10-03T17:01:17.194Z',
    '2022-10-04T17:01:17.194Z',
    '2022-10-09T17:01:17.194Z',
    '2022-10-10T22:36:17.929Z',
    '2022-10-11T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2022-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  // locale: 'en-US',
  locale: 'pl-PL',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions
const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const formatMovementDate = function (date, locate) {
  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const now = new Date();
  const daysPassed = calcDaysPassed(date, now);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} ago`;

  return new Intl.DateTimeFormat(locate).format(now);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCur(
          mov,
          acc.locale,
          acc.currency
        )}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${`${formatCur(
    Math.abs(out),
    acc.locale,
    acc.currency
  )}`}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCur(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

const resetTimer = function () {
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
};

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // 'long', '2digit'
      year: 'numeric',
    };
    // const locale = navigator.language;
    const now = new Date();
    labelDate.textContent = Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    resetTimer();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    resetTimer();
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(Number(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      resetTimer();
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

const logOut = function () {
  currentAccount = null;
  containerApp.style.opacity = 0;
};

const startLogOutTimer = function () {
  let logOutTime = 600;

  const tick = function () {
    if (logOutTime <= 0) {
      logOut();
      clearInterval(timer);
    }
    labelTimer.textContent = `${String(Math.floor(logOutTime / 60)).padStart(
      2,
      0
    )}:${String(logOutTime % 60).padStart(2, 0)}`;
    logOutTime--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// String to number
console.log(23 === 23.0);
console.log(0.1 + 0.2 === 0.3);

console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('010100101010xclxcc', 10));
console.log(Number.parseInt('010100101010xclxcc', 2));

console.log(Number.parseFloat(' 2.5rem  '));
console.log(Number.parseInt(' 2.5rem  '));

// Check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(32 / 0)); // Infinity is false in this case
console.log(Number.isNaN(NaN));

console.log('\n\n');

// Check if value is number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(30 / 0));
console.log(Number.isFinite(NaN));

console.log('\n\n');
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));
*/

/*
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 3, 4, 5, 234, 234, 23, '4234234234'));
console.log(Math.max(5, 3, 4, 5, 234, 234, 23, '4234234234px'));
console.log(Math.min(5, 3, 4, 5, 234, 234, 23, '4234234234'));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
};
console.log(randomInt(10, 20));

// Rounding int
console.log(Math.trunc(23.6));
console.log('\n\n');

console.log(Math.round(23.3));
console.log(Math.round(23.6));
console.log('\n\n');

// round up
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.6));
console.log('\n\n');

// round down
console.log(Math.floor(23.3));
console.log(Math.floor(23.6));
console.log('\n\n');

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));
console.log('\n\n');

// rounding decimal
console.log((2.7).toFixed(3));
console.log(Number((2.345).toFixed(2)));
*/
/*
console.log(5 % 2);
console.log(8 % 3);

labelBalance.addEventListener('click', function () {
  Array.from(document.querySelectorAll('.movements__row')).forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = 'lightgrey';
    // if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/
/*
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15;
// const PI = 3._1415;
// const PI = _3.1415;   // illegal
// const PI = 3.1415_;
// const PI = 3.14__15;
console.log(PI);

console.log(Number('230_000'));
console.log(Number.parseInt('230_000'));
*/
/*
// Biggest number
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// Int in js 64 bits - 53 bits used to store value
// JS is working in background to make some operations possibile, etc. 2 ** 53 + 12
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 12);

// BigINT
console.log(2139812398129831892389123891289398128931892832189991228312983n);
// sometime big int is not precise, better user 'n' and the end of number
console.log(BigInt(213981239812983189238912381238312983));

// console.log(Math.sqrt(25n)); // error

console.log(213910293810298333019283n + 123024232340239423823023n);
console.log(213910293810298333019283n * 123024232340239n);

const huge = 123123123123123n;
const num = 23;
// console.log(huge * num); // error
console.log(huge * BigInt(num));

console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');
console.log(`${20n} is really BIG`);

// division
console.log(11n / 3n); // cut of decimal part
console.log(10 / 3);
*/
/*

// Creating date
const now = new Date();
console.log(now);

console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));

console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5)); // month from 0
console.log(new Date(2037, 10, 31));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // timestamp

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); // day
console.log(future.getDay()); // of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

console.log(future.toISOString());
console.log(future.getTime()); // 2142253380000
console.log(new Date(2142253380000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);
*/
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));

const calcDaysPassed = (date1, date2) =>{
  const days = Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
  if (days === 1)
}
console.log(calcDaysPassed(new Date(2021, 3, 14, 10, 8), new Date(2021, 3, 4)));
*/
/*
const num = 2349823.34;

const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: true,
};

console.log('US', Intl.NumberFormat('en-US', options).format(num));
console.log('DE', Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria', Intl.NumberFormat('ar-SY', options).format(num));
*/
/*
// setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}!`),
  3000,
  ...ingredients
); // after 3 sec run this
console.log('Waiting...');

// we can cancel timeout
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval - every some time

const options = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

setInterval(function () {
  const now = new Date();
  console.log(Intl.DateTimeFormat('en-GB', options).format(now));
}, 1000);
*/
