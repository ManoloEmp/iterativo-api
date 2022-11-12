const express = require("express");
const {
  // createProductUseCase,
  productController,
  // createCategoryUseCase,
  categoryController,
  catalogController,
  variantController,
} = require("./application");

const router = express.Router();

router.post("/products", async (req, res) => {
  return await productController.createProductHandle(req, res);
});

router.get("/products", async (req, res) => {
  return await productController.findAllProductsHandle(req, res);
});

// Categories routes

router.post("/categories", async (req, res) => {
  return await categoryController.createCategoryHandle(req, res);
});

router.get("/categories", async (req, res) => {
  return await categoryController.findAllCategoriesHandle(req, res);
});

router.put("/categories", async (req, res) => {
  return await categoryController.updateCategoryHandle(req, res);
});

// Catalog routes

router.post("/catalogs", async (req, res) => {
  return await catalogController.createCatalogHandle(req, res);
});

router.get("/catalogs", async (req, res) => {
  return await catalogController.findAllCatalogsHandle(req, res);
});

// Variant routes

router.post("/variants", async (req, res) => {
  return await variantController.createVariantHandle(req, res);
});

router.get("/variants", async (req, res) => {
  return await variantController.findAllVariantsHandle(req, res);
});

module.exports = router;
