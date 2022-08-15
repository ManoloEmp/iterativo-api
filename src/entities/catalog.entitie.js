class Catalog {
  constructor (id, name, description, products) {
    this._id = id
    this._name = name
    this._description = description
    this._products = products
  }

  static create (id, name, description, products) {
    return new Catalog(id, name, description, products)
  }
}

module.exports = {
  Catalog
}
