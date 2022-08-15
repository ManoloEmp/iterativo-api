const { createProductUseCase, productController } = require(
  "./product.controller",
);
const { createCategoryUseCase, categoryController } = require(
  "./category.controller",
);
const { catalogController } = require("./catalog.controller");
const { variantController } = require("./variant.controller");

module.exports = {
  createProductUseCase,
  productController,
  createCategoryUseCase,
  categoryController,
  catalogController,
  variantController,
};
