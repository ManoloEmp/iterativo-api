const { Variant, Price, Size } = require("../entities");

class CreateVariantUseCase {
  constructor(variantRepo, productRepo) {
    this._variantRepo = variantRepo;
    this._productRepo = productRepo;
  }

  async execute(ctx) {
    const product = await this._productRepo.findByName(ctx.get("product").name)
      .then((value) => {
        return value;
      }).catch((e) => {
        return e;
      });

    if (!(product && Object.entries(product).length > 0)) {
      return {
        message: "The product don´t exist",
      };
    }

    const price = Price.create(
      ctx.get("price").amount,
      ctx.get("price").currency,
    );

    console.log("la id", product.id);

    const variant = Variant.create(
      ctx.get("id"),
      price,
      product.id,
    );

    console.log("la var", variant);

    const saved = await this._variantRepo.save(variant).then((value) => {
      return value;
    }).catch((e) => {
      return e;
    });

    return {
      message: saved,
    };
  }
}

module.exports = CreateVariantUseCase;
