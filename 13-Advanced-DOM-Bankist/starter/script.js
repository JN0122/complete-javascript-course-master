'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const sections = document.querySelectorAll('.section');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const imgTargets = document.querySelectorAll('img[data-src');
const slides = document.querySelectorAll('.slide');
const buttonLeft = document.querySelector('.slider__btn--left');
const buttonRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el => el.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function () {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (x,y): ', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // OLD WAY
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // MODERN
  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(link => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// event delagation - more efficent than creating copy of a function n times
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    if (id === '#') return;

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    ?.classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(function (el) {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', e => handleHover(e, 0.5));
nav.addEventListener('mouseout', e => handleHover(e, 1));

// Sticky navigation
/*
const initialCoords = section1.getBoundingClientRect();

// not efficient
window.addEventListener('scroll', function (e) {
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/
const stickiNav = function (entries, observer) {
  if (!entries[0].isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickiNav, {
  root: null, // entire viewport
  threshold: 0, // 10% of section is visible
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

const handleFadeIn = function (entries, observer) {
  // only 1 threshold, entries.length = 1
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(handleFadeIn, {
  root: null,
  threshold: 0.3,
});
sections.forEach(section => {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy loading images
const imgLazyLoad = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgLazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

// SLIDER
const slider = function () {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dots__dot');
    dot.dataset.slide = i;
    dotsContainer.insertAdjacentElement('beforeend', dot);
  });

  const dots = dotsContainer.querySelectorAll('button');

  const updateDots = function (currentSlide) {
    dots.forEach((el, i) => {
      if (i === Number(currentSlide)) el.classList.add('dots__dot--active');
      else el.classList.remove('dots__dot--active');
    });
  };

  const updateSlides = function (currentSlide = 0) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
      updateDots(currentSlide);
    });
  };
  updateSlides();

  let currentSlide = 0;
  const nextSlide = function () {
    currentSlide++;
    if (currentSlide === slides.length) currentSlide = 0;
    updateSlides(currentSlide);
  };

  const prevSlide = function () {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    updateSlides(currentSlide);
  };

  buttonRight.addEventListener('click', nextSlide);
  buttonLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;

    updateSlides(e.target.dataset.slide);
  });
};
slider();
/*
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`;
header.after(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
*/

/*
console.log(document.documentElement);
const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
console.log(sections);

// HTMLCollection - live update on elements
document.getElementById('section--1');
const buttons = document.getElementsByTagName('button');
console.log(buttons);

console.log(document.getElementsByClassName('btn'));

// creating and inserting elements
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = `We use cookies for improved functionality and analytics.`;
message.innerHTML = `We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`;
// header.prepend(message); // at top
header.append(message);
// header.append(message.cloneNode(true)); // insert in two places at the same time

// header.before(message);
header.after(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor); // display only values that we set

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);



document.documentElement.style.setProperty('--color-primary', 'orangered');
const logo = document.querySelector('.nav__logo');

console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.className);
console.log(logo.designer);
console.log(logo.getAttribute('designer'));

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);
logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

logo.classList.add('c', 'i');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('i');

// Do not use
// logo.className = 'jonas';
*/
/*
const h1 = document.querySelector('h1');

const headingAlert = function () {
  alert('addEventListener: Great! You are reading the heading :3');
};

h1.addEventListener('mouseenter', headingAlert);
setTimeout(() => {
  h1.removeEventListener('mouseenter', headingAlert);
}, 3000);
*/
// old way
// h1.onmouseenter = function () {
//   alert('addEventListener: Great! You are reading the heading :3');
// };

/*
const random = (min, max) => Math.trunc(Math.random() * (max - min + 1)) + min;

// rgb(255,255,255)
const generateRandomColor = function () {
  return `rgb(${random(0, 255)},  ${random(0, 255)}, ${random(0, 255)})`;
};

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = generateRandomColor();
  console.log('nav__link');
  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = generateRandomColor();
  console.log('nav__links');
});

// Third argument indicates if the event is called during capturing phase or bubbleing
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = generateRandomColor();
    console.log('NAV');
  },
  // true
  false
);
*/
/*
const h1 = document.querySelector('h1');

// going downwards
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'orange';

// upwards
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// sideways
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', () => console.log('Page load fully'));

// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
