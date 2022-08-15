const { Category, Name, Description } = require('../entities')

class UpdateCategoryUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async execute (ctx) {
    const result = await this.repository.findByName(ctx.get('params').name).then((value) => {
      return value
    }).catch((e) => {
      return e
    })

    if (result && Object.entries(result).length > 0) {
      const name = Name.create(result.name.value)
      const description = Description.create(result.name.value)

      const category = Category.create(
        result.id,
        name,
        description
      )

      const updated = await this.repository.update(category).then((value) => {
        return value
      }).catch((e) => {
        return e
      })

      return {
        message: updated
      }
    }
  }
}

module.exports = UpdateCategoryUseCase
