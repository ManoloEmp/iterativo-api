const { ProductRepository, VariantRepository } = require('../../repositories')
const {
  CreateVariantUseCase,
  FindAllVariantsUseCase
} = require('../../use-cases')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const cuid = require('cuid')
// const Joi = require('joi')

class VariantController {
  constructor (createProductUC, findAllVariantsUC) {
    this.create = createProductUC
    this.findAll = findAllVariantsUC
  }

  async createVariantHandle (request, response) {
    const { price, size, product } = request.body

    const id = cuid()

    console.log('price', price, 'size', size, 'product', product)

    const props = {
      id: id,
      price: price,
      size: size,
      product: product
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

  async findAllVariantsHandle (request, response) {
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

const variantRepo = new VariantRepository(prisma)
const productRepo = new ProductRepository(prisma)
const createVariantUseCase = new CreateVariantUseCase(variantRepo, productRepo)
const findAllVariantsUseCase = new FindAllVariantsUseCase(variantRepo)
const variantController = new VariantController(createVariantUseCase, findAllVariantsUseCase)

module.exports = {
  createVariantUseCase,
  variantController,
  findAllVariantsUseCase
}
