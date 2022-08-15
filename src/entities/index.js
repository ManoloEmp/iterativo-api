const { Product, Value } = require("./product.entitie");
const { Category } = require("./category.entitie");
const { Catalog } = require("./catalog.entitie");
const { Variant } = require("./variant.entitie");

const {
  Name,
  Description,
  Price,
} = require("./value-objects");

module.exports = {
  Product,
  Category,
  Catalog,
  Variant,
  Value,
  Name,
  Price,
  Description,
};
