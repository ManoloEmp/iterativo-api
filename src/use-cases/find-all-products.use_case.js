// const { Value, Product, Name, Description } = require('../entities')

class FindAllProductsUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async execute () {
    const result = await this.repository.findAllProducts().then((value) => {
      return value
    }).catch((e) => {
      return e
    })

    return {
      message: result
    }
  }
}

module.exports = FindAllProductsUseCase
