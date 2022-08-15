class VariantRepository {
  constructor(orm) {
    this._orm = orm;
  }

  async findById(id) {
    console.log("por aqui catalogUC", id);
    const variant = await this._orm.variant.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    console.log("por aqui post pro", variant);
    return variant;
  }

  async findAllVariants() {
    const variants = await this._orm.variant.findMany();
    return variants;
  }

  async save(variant) {
    const saved = await this._orm.variant.create({
      data: {
        id: variant._id,

        price: variant._price.amount,

        product: {
          connect: {
            id: variant._product_id,
          },
        },

        published: false,
      },
    });

    return saved;
  }
}

module.exports = VariantRepository;
