class Variant {
  constructor(id, price, productId) {
    this._id = id;
    this._price = price;
    this._product_id = productId;
  }

  static create(id, price, productId) {
    return new Variant(id, price, productId);
  }
}

module.exports = {
  Variant,
};
