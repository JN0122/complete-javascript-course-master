import { addToCart, qt, totalPrice as price } from './shippingCart.js';

console.log('Importing module');
console.log(addToCart('Monitor', 3));
console.log(price, qt);

// import * as ShoppingCart from './shippingCart.js';

// console.log(ShoppingCart);
// ShoppingCart.addToCart('Bread', 5);

// DEFAULT
/*
import add from './shippingCart.js';
add('Mleko', 3);
add('bread', 2);

import { cart } from './shippingCart.js';
console.log(cart);
*/

// console.log('start');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('siemano jeste po ');
/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

// not clean code
// const lastPost = getLastPost();
// lastPost.then(post => console.log(post));

import {} from './shippingCart.js';

const lastPost = await getLastPost();
console.log(lastPost);
*/
/*
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 70;
  const totalQuantity = 5;

  const addToCart = function (prod, quantity) {
    cart.push({ name: prod, quantity });
    console.log(
      `${quantity} ${prod} was added to cart, shipping cost ${shippingCost}`
    );
  };

  const orderStock = function (prod, quantity) {
    console.log(`${quantity} ${prod} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 5);
ShoppingCart2.addToCart('pizza', 3);
console.log(ShoppingCart2);
*/
/*
// Export
export.addToCart = function (prod, quantity) {
  cart.push({ name: prod, quantity });
  console.log(
    `${quantity} ${prod} was added to cart, shipping cost ${shippingCost}`
  );
};

// Import
const {addToCart} = require('./shoppingCart.js')
*/

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep, { camelCase } from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 3 },
    { product: 'pizza', quantity: 5 },
  ],
  user: {
    loggedIn: true,
  },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);

class Person {
  #greeting = 'Hey';

  constructor(name) {
    console.log(`${this.#greeting}, ${name}`);
  }
}
const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(state.cart.find(el => el.quantity >= 4));
Promise.resolve('siemano').then(x => console.log(x));
if (module.hot) {
  module.hot.accept();
}

import 'core-js/stable/array/find';
import 'core-js/stable/promise';

// Polifill async
import 'regenerator-runtime/runtime';
