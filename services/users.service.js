const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService {

  constructor() {
    this.user = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.user.push({
        idUser: faker.datatype.uuid(),
        nameUser: faker.internet.userName(),
        emailUser: faker.internet.email(),
        isBlock: faker.datatype.boolean(),
        
      });
    }
  }
  
    async create (dataU) {
      const newUserU = {
        idUser: faker.datatype.uuid(),
        ...dataU
      }
      this.user.push(newUserU);
      return newUserU;
     }

   find() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.user);
        }, 1000);
      })
   }

   async findOne(idUser) {
    const userD = this.user.find(item => item.idUser === idUser);
    if (!userD) {
      throw boom.notFound('Account not found');
    }
    if (userD.isBlock) {
      throw boom.conflict('Account is block');
    }
    return userD;
   }

   async update(idUser, changes) {
    const index = this.user.findIndex(item => item.idUser === idUser);
    if (index === -1) {
      throw boom.notFound('Account not found');
    }
    const users = this.user[index];
    this.user[index] = {
      ...users,
      ...changes
    };
    return this.user[index];
   }

   async delete(id) {
   
   }
}

module.exports = UsersService;
