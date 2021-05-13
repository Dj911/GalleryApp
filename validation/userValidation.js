const joi = require('joi');

const joiSchema = joi.object({
    name: joi.string().min(5).max(12),
    email: joi.string().email().required(),
    mobileNumber: joi.number().integer(),//.max(10),
    password: joi.string().required()
}).options({ abortEarly: false })     // will show all the validation error, by default it's true

module.exports = joiSchema