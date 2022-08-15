const { ProductRepository, CatalogRepository } = require('../../repositories')
const {
  CreateCatalogUseCase,
  FindAllCatalogsUseCase

} = require('../../use-cases')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const cuid = require('cuid')
// const Joi = require('joi')

class CatalogController {
  constructor (createCatalogUC, findAllCatalogsUC) {
    this.create = createCatalogUC
    this.findAll = findAllCatalogsUC
  }

  async createCatalogHandle (request, response) {
    const { name, description, products } = request.body

    const id = cuid()

    console.log('name', name, 'description', description)

    const props = {
      id: id,
      name: name,
      description: description,
      products: products
    }

    const ctx = new Map(Object.entries(props))

    const res = await this.create.execute(ctx).then((value) => { // originalmente let
      return response.status(201).send(value)
    }).catch((e) => {
      return response.status(400).json({
        message: e.message || 'Unexpected error'
      })
    })
    return res // Objeto a rust
  }

  async findAllCatalogsHandle (request, response) {
    const res = await this.findAll.execute().then((value) => { // originalmente let
      return response.status(201).send(value)
    }).catch((e) => {
      return response.status(400).json({
        message: e.message || 'Unexpected error'
      })
    })
    return res // Objeto a rust
  }
}

const catalogRepo = new CatalogRepository(prisma)
const productRepo = new ProductRepository(prisma)
const createCatalogUseCase = new CreateCatalogUseCase(catalogRepo, productRepo)
const findAllCatalogsUseCase = new FindAllCatalogsUseCase(catalogRepo)
const catalogController = new CatalogController(createCatalogUseCase, findAllCatalogsUseCase)

module.exports = {
  createCatalogUseCase,
  catalogController,
  findAllCatalogsUseCase
}
