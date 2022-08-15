const { Category, Name, Description } = require('../entities')

class CreateCategoryUseCase {
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
        message: 'The category allready exist'
      }
    }

    const name = Name.create(ctx.get('name').value)

    const description = Description.create(ctx.get('description').value)

    const category = Category.create(
      ctx.get('id'),
      name,
      description
    )

    const saved = await this.repository.save(category).then((value) => {
      return value
    }).catch((e) => {
      return e
    })

    return {
      message: saved
    }
  }
}

module.exports = CreateCategoryUseCase
