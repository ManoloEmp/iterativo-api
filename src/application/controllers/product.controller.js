const { ProductRepository } = require('../../repositories')
const {
  CreateProductUseCase,
  FindAllProductsUseCase
} = require('../../use-cases')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const cuid = require('cuid')
// const Joi = require('joi')

class ProductController {
  constructor (createProductUC, findAllProductsUC) {
    this.create = createProductUC
    this.findAll = findAllProductsUC
  }

  async createProductHandle (request, response) {
    const { name, description } = request.body

    const id = cuid()

    console.log('name', name, 'description', description)

    const props = {
      id: id,
      name: name,
      description: description
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

  async findAllProductsHandle (request, response) {
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

const postgres = new ProductRepository(prisma)
const createProductUseCase = new CreateProductUseCase(postgres)
const findAllProductsUseCase = new FindAllProductsUseCase(postgres)
const productController = new ProductController(createProductUseCase, findAllProductsUseCase)

module.exports = {
  createProductUseCase,
  productController,
  findAllProductsUseCase
}
