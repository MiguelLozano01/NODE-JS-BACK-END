const express = require('express');

// const faker = require('faker');
const UsersService= require('./../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUsersSchema, updateUsersSchema, getUsersSchema } = require('./../schemas/users.schema');

const router = express.Router();
const service = new UsersService();

// router.get('/users/', async (req, res) =>{
//   const { limit, offset }= await req.query;
//   const users = await service.find(limit, offset);
//   if (limit && offset) {
//     res.json({ limit,
//     offset
//   });
//   } else {
//     res.send('No hay parametros')
//   }
// });

router.get('/', async (req, res) => {
  const user = await service.find();
  res.json(user);
});

// router.get('/:id', async (req, res) =>{
//   const { idUser }= req.params;
//   const user = await service.findOne(idUser);
//   res.json(user);
// });

router.get('/:idUser',
  validatorHandler(getUsersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idUser } = req.params;
      const users = await service.findOne(idUser);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

// router.post('/', async (req, res) =>{
//   const body = req.body;
//   const newUserU = await service.create(body);
//   res.status(201).json(newUserU)
// });

router.patch('/:idUser',
  validatorHandler(getUsersSchema, 'params'),
  validatorHandler(updateUsersSchema, 'body'),
  async (req, res, next) => {
    try {
      const { idUser } = req.params;
      const body = req.body;
      const users = await service.update(idUser , body);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createUsersSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  }
);


module.exports = router;
