class Name {
  constructor(value) {
    this.value = value;
  }

  static create(value) {
    const obj = new Name(value);

    return Object.freeze(obj);
  }

  get(arg) {
    return this[arg];
  }
}

/*
const Name = {
  value: '',

  create (value) {
    const obj = Object.assign(Object.create(this), { value: value})

    return Object.freeze(this)
  },

  get (arg) {
    return this[arg]
  }
} */

class Description {
  constructor(value) {
    this.value = value;
  }

  static create(value) {
    const obj = new Description(value);

    return Object.freeze(obj);
  }

  get(arg) {
    return this[arg];
  }
}

/*
const Description = {
  value: '',

  create (value) {
    const obj = Object.assign(Object.create(this), { value: value})

    return Object.freeze(this)
  },

  get (arg) {
    return this[arg]
  }
} */

class Price {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  static create(amount, currency) {
    const obj = new Price(amount, currency);

    return Object.freeze(obj);
  }

  get(arg) {
    return this[arg];
  }
}

module.exports = {
  Name,
  Description,
  Price,
};
