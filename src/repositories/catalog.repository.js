class CatalogRepository {
  constructor (orm) {
    this._orm = orm
  }

  async findByName (name) {
    const catalog = await this._orm.catalog.findFirst({
      where: {
        name: {
          equals: name
        }
      }
    })

    return catalog
  }

  async findAllCatalogs () {
    const catalogs = await this._orm.catalog.findMany({
      include: {
        products: true // Include all products in the returned object
      }
    })
    return catalogs
  }

  async save (catalog) {
    console.log('el cat', catalog)
    const saved = await this._orm.catalog.create({

      data: {

        id: catalog._id,

        name: catalog._name,

        description: catalog._description,

        products: {
          connect: catalog._products.map((item, i) => {
            return { id: item.id }
          })
        },

        published: false

      },
      include: {
        products: true // Include all products in the returned object
      }

    })

    return saved
  }
}

module.exports = CatalogRepository
