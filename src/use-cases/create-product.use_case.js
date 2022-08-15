const { Product, Name, Description } = require('../entities')

class CreateProductUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async execute (ctx) {
    const result = await this.repository.findByName(ctx.get('name')).then((value) => {
      return value
    }).catch((e) => {
      return e
    })

    if (result && Object.entries(result).length > 0) {
      return {
        message: 'The product allready exist'
      }
    }

    const name = Name.create(ctx.get('name').value)

    const description = Description.create(ctx.get('description').value)

    const product = Product.create(
      ctx.get('id'),
      name,
      description
    )

    const saved = await this.repository.save(product).then((value) => {
      return value
    }).catch((e) => {
      return e
    })

    return {
      message: saved
    }
  }
}

module.exports = CreateProductUseCase
