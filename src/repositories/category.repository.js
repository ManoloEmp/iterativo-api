/* const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient() */

class CategoryRepository {
  constructor (orm) {
    this._orm = orm
  }

  async findByName (name) {
    const category = await this._orm.category.findFirst({
      where: {
        name: {
          equals: name
        }
      }
    })

    return category
  }

  async findAllCategories () {
    const categories = await this._orm.category.findMany()
    return categories
  }

  async save (category) {
    console.log('cat', category)
    const saved = await this._orm.category.create({

      data: {

        id: category._id,

        name: category._name,

        description: category._description,

        published: false

      }

    })

    console.log('saved', saved)

    return saved
  }

  async update (category) {
    const updateCategory = await this._orm.category.update({
      where: {
        id: category._id
      },
      data: {
        super: {
          connect: {
            id: category._id
          }
        }
      }
    })

    return updateCategory
  }
}

module.exports = CategoryRepository
