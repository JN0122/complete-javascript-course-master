'use strict';

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(model, speed) {
    this.model = model;
    this.speed = speed;
  }

  displaySpeed() {
    console.log(`${this.model} current speed is: ${this.speed}`);
  }

  break() {
    this.speed -= 5;
    this.displaySpeed();
    return this;
  }

  accelerate() {
    this.speed += 10;
    this.displaySpeed();
    return this;
  }

  set speedUS(miles) {
    this.speed = miles * 1.6;
  }
  get speedUS() {
    this.speed /= 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(model, speed, charge) {
    super(model, speed);
    this.#charge = charge;
  }

  displaySpeed() {
    console.log(
      `${this.model} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    this.displaySpeed();
    return this;
  }

  chargeBattery(charge) {
    this.#charge = charge;
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);

rivian.speedUS = 120;

rivian.accelerate().break().chargeBattery(90).break();

/*
class Account {
  // public fields
  locale = navigator.language;

  // private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected property only by convention (still can be modified)
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;
    console.log(`Thanks for oppening acc :)`);
  }

  // Public interface, Public methods
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    return this;
  }

  withdraw(value) {
    this.deposit(-value);
    return this;
  }

  _approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    if (this._approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan approved!`);
    }
    return this;
  }

  // Private methods
  // #approveLoan(value) {  // not work yet
  //   return true;
  // }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(20);
acc1.requestLoan(2000);

console.log(acc1);

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(400);

// console.log(acc1.#approveLoan);

// console.log(acc1.#movements);

/*
const PersonProto = {
  calcAge() {
    console.log(`I am ${2037 - this.birthYear} years old.`);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`Hi my name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.calcAge();
jay.introduce();

/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.birthYear = birthYear;
    this.fullName = fullName;
  }

  // Method added to prototype
  clacAge() {
    console.log(2037 - this.birthYear);
  }

  // same as below
  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  // set prop that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is no a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always super must be first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  clacAge() {
    console.log(
      `I am ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}
const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.clacAge();

// class StudentCl extends PersonCl {}
// const martha = new StudentCl('Martha Jones', 2012);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
  this.speed = speed;
  this.make = make;
};

Car.prototype.displaySpeed = function () {
  console.log(`Current speed of ${this.make}: ${this.speed} km/h`);
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  this.displaySpeed();
};
Car.prototype.brake = function () {
  this.speed -= 5;
  this.displaySpeed();
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBatteryTo = function (charge) {
  this.charge = charge;
};

EV.prototype.displaySpeed = function () {
  console.log(
    `Current speed of ${this.make}: ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  this.displaySpeed();
};

const tesla = new EV('Tesla', 120, 23);
tesla.displaySpeed();

/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
// Linking prototypes
Student.prototype = Object.create(Person.prototype);
// Student.prototype = Person.prototype; // DON NOT USE THIS, Student prototype will be the same object as Person, we dont want that

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
// mike.calcAge();

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class Car {
  constructor(model, speed) {
    this.model = model;
    this.speed = speed;
  }

  displaySpeed() {
    console.log(`${this.model} current speed is: ${this.speed}`);
  }

  break() {
    this.speed -= 5;
    this.displaySpeed();
  }

  accelerate() {
    this.speed += 10;
    this.displaySpeed();
  }

  set speedUS(miles) {
    this.speed = miles * 1.6;
  }
  get speedUS() {
    this.speed /= 1.6;
  }
}

const ford = new Car('Ford', 120);

/*
const PersonProto = {
  clacAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;

steven.clacAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);

sarah.clacAge();
/*
// static method are defined within constructor
// '1'.parseFloat() - will not work
// Number.parseFloat() - will work

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.hey = function () {
  console.log('Hey there');
  console.log(this);
};

const jonas = new Person('Jonas Schmidtman', 1999);

Person.hey();
// jonas.hey(); // error

class PersonCl {
  constructor(fullName, birthYear) {
    this.birthYear = birthYear;
    this.fullName = fullName;
  }

  // Instance method
  get age() {
    return 2037 - this.birthYear;
  }

  // Static method
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

PersonCl.hey();

/*
const account = {
  owner: 'jonas',
  movements: [200, 300, -100, 500],

  get latest() {
    return this.movements.at(-1);
  },

  set setLastest(movement) {
    this.movements.push(movement);
  },
};
console.log(account.latest);
account.setLastest = -300;
console.log(account.movements);

class PersonCl {
  constructor(fullName, birthYear) {
    this.birthYear = birthYear;
    this.fullName = fullName;
  }

  // Method added to prototype
  clacAge() {
    console.log(2037 - this.birthYear);
  }

  // same as below
  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  // set prop that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is no a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl('Jessica', 1999);
console.log(jessica.age);

const walter = new PersonCl('Walter White', 2001);
console.log(walter.age);

/*
// Clases are executing in strict mode
// not hoisted
// can be passed as argument or returned from function

// class expression
// const PersonCl = class{}

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Method added to prototype
  clacAge() {
    console.log(2037 - this.birthYear);
  }

  // same as below
  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}


const jessica = new PersonCl('Jessica', 1998);
jessica.clacAge();

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet();
///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
  this.speed = speed;
  this.make = make;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`Current speed of ${this.make}: ${this.speed} ${this.unit}`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`Current speed of ${this.make}: ${this.speed} ${this.unit}`);
};
Car.prototype.unit = 'km/h';

const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

BMW.accelerate();
BMW.accelerate();
BMW.brake();
BMW.brake();
BMW.brake();
BMW.brake();
BMW.brake();
BMW.brake();
BMW.brake();

Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
Mercedes.brake();
*/
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never do this, in case of 1000 copies this function will be duplicated many times
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1992);

// 1. New {} is created
// 2. Fun is called, this = {}
// 3. {} linked to prototype
// 4. Function automatically returns {}

const adam = new Person('Adam', 2012); // instance
const marek = new Person('Marek', 2002);
const jay = new Person('Jonas', 1992);

console.log(jonas, adam, marek);

console.log(jonas instanceof Person);
console.log(jay instanceof Person);

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
5;
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));

Person.prototype.spieces = 'Homo Sapiens';
console.log('\n');
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('spieces'));

console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 5, 2, 4, 3, 2];
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());
const h1 = document.querySelector('h1');
console.dir(h1);

console.dir(x => x + 1);
*/
