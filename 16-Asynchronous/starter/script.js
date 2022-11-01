'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*
navigator.geolocation.getCurrentPosition(
  () => console.log(`dziala`),
  () => console.log(`nie dziala`)
);

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        Number(data.population) / 1_000_000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('poland');
getCountryData('usa');
*/
/*
const renderCountry = function (data, neighbour = '') {
  const html = `<article class="country ${neighbour}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        Number(data.population) / 1_000_000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    renderCountry(data);

    const border = data.borders?.[0];
    if (!border) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${border}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      renderCountry(data, 'neighbour');
    });
  });
};

getCountryAndNeighbour('norway');
*/
/*
const renderCountry = function (data, neighbour = '') {
  const html = `<article class="country ${neighbour}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        Number(data.population) / 1_000_000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData('Poland');
*/
/*
const getCountryData = function (country) {
  const getJSON = function (url, errorMsg = 'Something went wrong!') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} ${response.status}.`);
      return response.json();
    });
  };

  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No neighbour found!');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => renderError(err))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('Spain');
});

getCountryData('Iceland');
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
/*
const renderCountry = function (data, neighbour = '') {
  const html = `<article class="country ${neighbour}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        Number(data.population) / 1_000_000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const errorHandler = err => console.error(err);

const getJSON = function (url, errMsg = 'Something went wrong!') {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errMsg} ${res.status}`);
    return res.json();
  });
};

const whereAmI = function (lat, lng) {
  getJSON(
    `https://geocode.xyz/${lat},${lng}?geoit=json`,
    'Something went wrong with geocoding!'
  )
    .then(data => {
      console.log(`You are in ${data.region}, ${data.country}`);
      return getJSON(
        `https://restcountries.com/v3.1/name/${data.country}`,
        'Something went wrong with restcountries!'
      );
    })
    .then(([data]) => renderCountry(data))
    .catch(errorHandler);
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

navigator.geolocation.getCurrentPosition(
  function (pos) {
    whereAmI(pos.coords.latitude, pos.coords.longitude);
  },
  err => errorHandler(err.message)
);
*/
/*
console.log('test start');
const now = Date.now();
setTimeout(() => console.log(`${Date.now() - now} ms passed`), 0);
Promise.resolve('Resolved promise 1').then(res =>
  console.log(res, `${Date.now() - now} ms passed`)
);

Promise.resolve('Resolve promise 2').then(res => {
  for (let i = 0; i <= 1_000_000_000; i++) {}
  console.log(res, `${Date.now() - now} ms passed`);
});

console.log('test end');
*/
/*
const lotteryPromise = new Promise((resolve, reject) => {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) resolve('You WIN');
    else reject(new Error('You LOST'));
  }, 2000);
});

lotteryPromise
  .then(res => console.log(res))
  .catch(err => console.log(err.message));

console.log('-----------');

// Promisifying
const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second passed');
    return wait(1);
  });

Promise.resolve('abc').then(res => console.log(res));
Promise.reject(new Error('cba')).catch(res => console.error(res));
*/

// navigator.geolocation.getCurrentPosition(
//   pos => console.log(pos.coords),
//   err => console.error(err.message)
// );

const renderCountry = async function (data, neighbour = '') {
  const html = `<article class="country ${neighbour}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          Number(data.population) / 1_000_000
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCoords = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(new Error(err.message))
    )
  );

const errorHandler = err => console.error(err.message);

const getJSON = (url, errMsg = 'Something went wrong!') =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errMsg} ${res.status}`);
    return res.json();
  });

/*

const whereAmI = function () {
  getCoords()
    .then(res =>
      getJSON(
        `https://geocode.xyz/${res.lat},${res.lng}?geoit=json`,
        'Something went wrong with geocoding!'
      )
    )
    .then(data => {
      console.log(`You are in ${data.region}, ${data.country}`);
      return getJSON(
        `https://restcountries.com/v3.1/name/${data.country}`,
        'Something went wrong with restcountries!'
      );
    })
    .then(([data]) => renderCountry(data))
    .catch(errorHandler);
};
btn.addEventListener('click', whereAmI);
*/
///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
/*
const imagesContainer = document.querySelector('.images');

const createAndInsertImage = src =>
  new Promise(function (resolve, reject) {
    const imgEl = document.createElement('img');
    imgEl.src = src;

    imgEl.addEventListener('load', () => {
      // imagesContainer.insertAdjacentElement('beforeend', imgEl);
      imagesContainer.append(imgEl);
      resolve(imgEl);
    });
    imgEl.addEventListener('error', () =>
      reject(new Error('Error while loading image'))
    );
  });

const wait = sec =>
  new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });

let imgEl;

createAndInsertImage('img/img-1.jpg')
  .then(el => {
    imgEl = el;
    return wait(2);
  })
  .then(() => imgEl.remove())
  .then(() => createAndInsertImage('img/img-2.jpg'))
  .then(el => {
    imgEl = el;
    return wait(2);
  })
  .then(() => imgEl.remove())
  .then(() => createAndInsertImage('3'))
  .then(el => {
    imgEl = el;
    return wait(2);
  })
  .then(() => imgEl.remove())
  .catch(err => console.error(err.message));
*/

const whereAmI = async function () {
  try {
    const coords = await getCoords();
    const geolocationRes = await fetch(
      `https://geocode.xyz/${coords.lat},${coords.lng}?geoit=json`
    );
    if (!geolocationRes.ok) throw new Error('Problem with location data');

    const geolocationJSON = await geolocationRes.json();
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${geolocationJSON.country}`
    );

    if (!res.ok)
      throw new Error(
        `Problem with getting courty: ${geolocationJSON.country}`
      );

    const [data] = await res.json();
    renderCountry(data);
    return `You are in ${geolocationJSON.city}, ${geolocationJSON.country}`;
  } catch (err) {
    errorHandler(err);

    throw err;
  }
};

// const city = whereAmI();
// console.log(city);

// console.log('1: Getting data');
// whereAmI()
//   .then(city => console.log(`2: %s`, city))
//   .catch(err => alert(err.message))
//   .finally(() => console.log('3: Finished'));
/*
(async function () {
  console.log('1: Getting data');
  try {
    const city = await whereAmI();
    console.log(`2: %s`, city);
  } catch (err) {
    alert(err.message);
  }
  console.log('3: Finished');
})();
*/
/*
const get3Countries = async function (country1, country2, country3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${country1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${country2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${country3}`
    // );

    // If 1 is rejected all are rejected
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${country1}`),
      getJSON(`https://restcountries.com/v3.1/name/${country2}`),
      getJSON(`https://restcountries.com/v3.1/name/${country3}`),
    ]);
    console.log(data.flatMap(country => country[0].capital));

    // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
  } catch (err) {
    alert(err);
  }
};

get3Countries('Poland', 'Ukraine', 'Canada');
*/
/*
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/sweden`),
    getJSON(`https://restcountries.com/v3.1/name/malta`),
  ]);
  console.log(res[0].name);
});

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took to long'));
    }, s * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/italy`),
  getJSON(`https://restcountries.com/v3.1/name/norway`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

Promise.allSettled([
  Promise.reject('ERROR'),
  Promise.resolve('Git'),
  Promise.resolve('Git2'),
]).then(res => console.log(res));

Promise.all([
  Promise.reject('ERROR'),
  Promise.resolve('Git'),
  Promise.resolve('Git2'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

Promise.any([
  Promise.reject('ERROR'),
  Promise.resolve('Git'),
  Promise.resolve('Git2'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
const imagesContainer = document.querySelector('.images');

const createAndInsertImage = (src, classname = '') =>
  new Promise(function (resolve, reject) {
    const imgEl = document.createElement('img');
    imgEl.src = src;

    imgEl.addEventListener('error', function () {
      reject(new Error(`Error while loading image: ${src}`));
    });

    imgEl.classList.add(classname);
    imgEl.addEventListener('load', function () {
      imagesContainer.append(imgEl);
      resolve(imgEl);
    });
  });

const loadAllImg = async function (imagesSrc) {
  const imgArr = imagesSrc.map(imgSrc =>
    createAndInsertImage(imgSrc, 'parallel')
  );
  console.log(imgArr);

  const imgsEl = await Promise.allSettled(imgArr).catch(err =>
    errorHandler(err)
  );
  console.log(imgsEl);
};

loadAllImg(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg', '4']);

const wait = sec =>
  new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });

const loadNPause = async function (imagesSrc) {
  try {
    let img = await createAndInsertImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';

    img = await createAndInsertImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';

    img = await createAndInsertImage('3');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err.message);
  }
};

// loadNPause();
