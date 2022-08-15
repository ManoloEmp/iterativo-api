class FindAllVariantsUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async execute () {
    const result = await this.repository.findAllVariants().then((value) => {
      return value
    }).catch((e) => {
      return e
    })

    return {
      message: result
    }
  }
}

module.exports = FindAllVariantsUseCase
