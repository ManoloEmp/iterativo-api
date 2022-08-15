class FindAllCatalogsUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async execute () {
    const result = await this.repository.findAllCatalogs().then((value) => {
      return value
    }).catch((e) => {
      return e
    })

    return {
      message: result
    }
  }
}

module.exports = FindAllCatalogsUseCase
