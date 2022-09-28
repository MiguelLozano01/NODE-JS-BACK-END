const Joi = require('joi');

const categoryId = Joi.string().uuid();
const productId = Joi.string().uuid();
const nameC = Joi.string().min(3).max(15);


const createCategoriesSchema = Joi.object({
    nameC: nameC.required(),

});

const updateCategoriesSchema = Joi.object({
    nameC: nameC
});

const getCategoriesSchema = Joi.object({
    categoryId: categoryId.required(),
});

module.exports = { createCategoriesSchema, updateCategoriesSchema, getCategoriesSchema }
