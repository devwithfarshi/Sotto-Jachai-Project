const joi = require("joi");

const RegisterUserValidation = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
    name: joi.string().required(),
  }),
};
const RegisterAdminValidation = {
  query: joi.object().keys({
    AdminSecret: joi.string().required(),
  }),
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
    name: joi.string().required(),
  }),
};
const LoginValidation = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
  }),
};

module.exports = {
  RegisterUserValidation,
  RegisterAdminValidation,
  LoginValidation,
};
