const { CategoryRepository } = require('../../repositories')
const {
  CreateCategoryUseCase,
  FindAllCategoriesUseCase,
  UpdateCategoryUseCase
} = require('../../use-cases')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const cuid = require('cuid')
// const Joi = require('joi')

class CategoryController {
  constructor (createCategoryUC, findAllCategoriesUC, updateCategoryUC) {
    this.create = createCategoryUC
    this.findAll = findAllCategoriesUC
    this.update = updateCategoryUC
  }

  async createCategoryHandle (request, response) {
    const { name, description } = request.body

    const id = cuid()

    console.log('name', name, 'description', description)

    const props = {
      id: id,
      name: name,
      description: description
    }

    const ctx = new Map(Object.entries(props))

    console.log('ctx', ctx)

    const res = await this.create.execute(ctx).then((value) => { // originalmente let
      return response.status(201).send(value)
    }).catch((e) => {
      return response.status(400).json({
        message: e.message || 'Unexpected error'
      })
    })
    return res // Objeto a rust
  }

  async findAllCategoriesHandle (request, response) {
    const res = await this.findAll.execute().then((value) => { // originalmente let
      return response.status(201).send(value)
    }).catch((e) => {
      return response.status(400).json({
        message: e.message || 'Unexpected error'
      })
    })
    return res// Objeto a rust
  }

  async updateCategoryHandle (request, response) {
    // const { name, description } = request.body

    // console.log('name', name, 'description', description)

    const props = {
      params: {
        name: request.params.name
      }
      // name: name,
      // description: description
    }

    const ctx = new Map(Object.entries(props))

    console.log('ctx', ctx)

    const res = await this.update.execute(ctx).then((value) => { // originalmente let
      return response.status(201).send(value)
    }).catch((e) => {
      return response.status(400).json({
        message: e.message || 'Unexpected error'
      })
    })

    return res
  }
}

const postgres = new CategoryRepository(prisma)
const createCategoryUseCase = new CreateCategoryUseCase(postgres)
const findAllCategoriesUseCase = new FindAllCategoriesUseCase(postgres)
const updateCategoriesUseCase = new UpdateCategoryUseCase(postgres)
const categoryController = new CategoryController(createCategoryUseCase, findAllCategoriesUseCase, updateCategoriesUseCase)

module.exports = {
  createCategoryUseCase,
  categoryController,
  findAllCategoriesUseCase
}
