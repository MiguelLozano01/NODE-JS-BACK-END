const faker = require('faker');
const boom = require('@hapi/boom');


class CategoriesService {

  constructor() {
    this.category = [];
    this.generate();
  }

generate(){
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.category.push({
        categoryId: faker.datatype.uuid(),
        productId: faker.datatype.uuid(),
        nameC: faker.commerce.productName(),
        isBlock: faker.datatype.boolean(),
      });
    }
}

  async create (dataC) {
    const newCategory = {
        CategoryId: faker.datatype.uuid(),
        productId: faker.datatype.uuid(),
        ...dataC
      }
      this.category.push(newCategory);
      return newCategory;
   }

   find() {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.category);
        }, 500);
      })
   }

   async findOne(categoryId) {
    const categoryD = this.category.find(item => item.categoryId === categoryId);
    if (!categoryD) {
      throw boom.notFound('Category not found');
    }
    if (categoryD.isBlock) {
      throw boom.conflict('Category is block');
    }
    return categoryD;
   }

   async update(categoryId, changes) {
    const index = this.category.findIndex(item => item.categoryId === categoryId);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    const categories = this.category[index];
    this.category[index] = {
      ...categories,
      ...changes
    };
    return this.category[index];
   }

   async delete(categoryId) {
    const index = this.category.findIndex(item => item.categoryId === categoryId);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.category.splice(index, 1);
    return { categoryId };
  }

}

module.exports = CategoriesService;
