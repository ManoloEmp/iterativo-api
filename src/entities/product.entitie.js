const { PrototypeError } = require('../errors/entities-errors.js')

class Product {
  constructor (id, name, description) {
    this._id = id
    this._name = name
    this._description = description
  }

  static create (id, name, description) {
    return new Product(id, name, description)
  }
}

const Value = { // originalmente let
  _type: '',
  _definition: {},

  get_definition: function (base) {
    return base._definition
  },

  is_proto: function (base, proto) {
    if (Object.getPrototypeOf(base) !== proto) {
      return new PrototypeError('this', 'Value')
    }
    return true
  },

  _create: function (type, definition) {
    const obj = Object.assign(Object.create(Value), { type: type, _definition: Object.entries(this._definition).length === 0 && definition ? definition : Object.assign({}, this._definition) })

    return obj
  }

}

module.exports = {
  Product,
  Value
}
