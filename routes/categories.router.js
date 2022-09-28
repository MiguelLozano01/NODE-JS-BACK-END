const express = require('express');


const CategoriesService= require('../services/categories.service') ;
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategoriesSchema, updateCategoriesSchema, getCategoriesSchema } = require('./../schemas/categories.schema');



const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) =>{
  const { categoryId, productId, nameC}= await req.params;
  const category = await service.find(categoryId, productId, nameC);
  res.json(category);
});

// router.get('/:id', async (req, res) =>{
//   const { categoryId, productId }= req.params;
//   const category = await service.findOne(categoryId, productId);
//   res.json(category);
// });

router.get('/:categoryId',
  validatorHandler(getCategoriesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId, productId, nameC } = req.params;
      const category = await service.findOne(categoryId, productId, nameC);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);


// router.post('/', async (req, res) =>{
//   const body = req.body;
//   const newCategory = await service.create(body);
//   res.status(201).json(newCategory);
// });


router.post('/',
  validatorHandler(createCategoriesSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  }
);

router.patch('/:categoryId',
  validatorHandler(getCategoriesSchema, 'params'),
  validatorHandler(updateCategoriesSchema, 'body'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const body = req.body;
      const categoryP = await service.update(categoryId, body);
      res.json(categoryP);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const rta = await service.delete(categoryId);
  res.json(rta);
});

module.exports = router;