'use strict';

class Budget {
  #budget = [];
  #limits = { jonas: 1500, matilda: 100 };

  constructor(budgetArr) {
    budgetArr.forEach(({ value, description, user }) => {
      this.#budget.push({ value, description, user });
    });
  }

  addIncome(value, description, user = 'jonas') {
    this._addToBudget(value, description, user);
    return this;
  }

  addExpence(value, description, user = 'jonas') {
    user = user.toLowerCase();
    const lim = this._getUserLimit(user);

    if (value <= lim) return this._addToBudget(-value, description, user);

    console.error(`Limit ${lim} reached! (${value})`);
    return this;
  }

  _addToBudget(value, description, user) {
    this.#budget.push({ value, description, user });
    return this;
  }

  setLimitFlags() {
    this.#budget.forEach(item => {
      const lim = this._getUserLimit(item.user);

      if (item.value < -lim) {
        item.flag = 'limit';
      }
    });
    return this;
  }

  show() {
    console.log(this.#budget);
    return this;
  }

  showBigExpenses(limit) {
    let outputArr = [];

    this.#budget.forEach(item => {
      if (item.value <= -limit) {
        outputArr.push(item.description.slice(-2)); // Emojis are 2 chars
      }
    });
    console.log(outputArr.join(' / '));
    return this;
  }

  _getUserLimit(user) {
    return this.#limits[user] ?? 0;
  }
}

const budget = new Budget([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

budget
  .addExpence(10, 'Pizza 🍕')
  .addExpence(100, 'Going to movies 🍿', 'Matilda')
  .addExpence(200, 'Stuff', 'Jay');

budget.show().setLimitFlags().show().showBigExpenses(100);
/*


var budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

var limits = {
  jonas: 1500,
  matilda: 100,
};

var add = function (value, description, user) {
  if (!user) user = 'jonas';
  user = user.toLowerCase();

  var lim;
  if (limits[user]) {
    lim = limits[user];
  } else {
    lim = 0;
  }

  console.log(value, lim);
  if (value <= lim) {
    budget.push({ value: -value, description: description, user: user });
  }
};
add(10, 'Pizza 🍕');
add(100, 'Going to movies 🍿', 'Matilda');
add(200, 'Stuff', 'Jay');
console.log(budget);

var check = function () {
  for (var el of budget) {
    var lim;
    if (limits[el.user]) {
      lim = limits[el.user];
    } else {
      lim = 0;
    }

    if (el.value < -lim) {
      el.flag = 'limit';
    }
  }
};
check();

console.log(budget);

var bigExpenses = function (limit) {
  var output = '';
  for (var el of budget) {
    if (el.value <= -limit) {
      output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
    }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
*/
