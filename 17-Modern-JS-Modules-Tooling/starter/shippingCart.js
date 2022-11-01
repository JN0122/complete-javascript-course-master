console.log('Exporting module');

//blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log('finished');

const shippingCart = 10;
export const cart = [];

export const addToCart = function (prod, quantity) {
  cart.push({ name: prod, quantity });
  console.log(`${quantity} ${prod} was added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as qt };

// export default function (prod, quantity) {
//   cart.push({ name: prod, quantity });
//   console.log(`${quantity} ${prod} was added to cart`);
// }
