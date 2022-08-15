/* const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient() */

class ProductRepository {
  constructor (orm) {
    this._orm = orm
  }

  async findByName (name) {
    console.log('por aqui catalogUC', name)
    const product = await this._orm.product.findFirst({
      where: {
        name: {
          equals: name
        }
      }
    })
    console.log('por aqui post pro', product)
    return product
  }

  async findAllProducts () {
    const products = await this._orm.product.findMany({
      include: {
        variant: true // Include all products in the returned object
      }
    })
    return products
  }

  async save (product) {
    const saved = await this._orm.product.create({

      data: {

        id: product._id,

        name: product._name,

        description: product._description,

        published: false

      }

    })

    return saved
  }
}

module.exports = ProductRepository
