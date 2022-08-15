const { Catalog, Name, Description } = require('../entities')

class CreateCatalogUseCase {
  constructor (catalogRepo, productRepo) {
    this._catalogRepo = catalogRepo
    this._productRepo = productRepo
  }

  async execute (ctx) {
    const result = await this._catalogRepo.findByName(ctx.get('name')).then((value) => {
      return value
    }).catch((e) => {
      return e
    })

    if (result && Object.entries(result).length > 0) {
      return {
        message: 'The catalog allready exist'
      }
    }

    console.log('array', ctx.get('products'))

    const products = ctx.get('products').map(async (item, i) => {
      console.log('item', item)
      const data = await this._productRepo.findByName(item).then((value) => {
        return value
      }).catch((e) => {
        return e
      })

      return data
    })

    const data = Promise.all(products).then(async (value) => {
      console.log('los pro', value)

      const name = Name.create(ctx.get('name').value)

      const description = Description.create(ctx.get('description').value)

      const catalog = Catalog.create(
        ctx.get('id'),
        name,
        description,
        value
      )

      const saved = await this._catalogRepo.save(catalog).then((value) => {
        return value
      }).catch((e) => {
        return e
      })

      return {
        message: saved
      }
    }).catch((e) => {
      return e
    })

    return data
  }
}

module.exports = CreateCatalogUseCase
