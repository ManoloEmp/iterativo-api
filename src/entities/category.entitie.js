class Category {
  constructor (id, name, description) {
    this._id = id
    this._name = name
    this._description = description
  }

  static create (id, name, description) {
    return new Category(id, name, description)
  }
}

module.exports = {
  Category
}
