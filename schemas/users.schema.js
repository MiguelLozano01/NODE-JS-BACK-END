const Joi = require('joi');

const idUser = Joi.string().uuid();
const nameUser = Joi.string().min(3).max(30);
const emailUser = Joi.string().min(15).max(50);

const createUsersSchema = Joi.object({
    nameUser: nameUser.required(),
    emailUser: emailUser.required()
});

const updateUsersSchema = Joi.object({
    nameUser: nameUser,
    emailUser: emailUser
});

const getUsersSchema = Joi.object({
  idUser: idUser.required()
});

module.exports = { createUsersSchema, updateUsersSchema, getUsersSchema }
