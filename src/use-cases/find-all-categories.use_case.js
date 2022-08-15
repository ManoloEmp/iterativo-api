// const { Value, Category, Name, Description } = require('../entities')

class FindAllCategoriesUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async execute () {
    const result = await this.repository.findAllCategories().then((value) => {
      return value
    }).catch((e) => {
      return e
    })

    return {
      message: result
    }
  }
}

module.exports = FindAllCategoriesUseCase
