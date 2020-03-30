const Joi = require('@hapi/joi');


//VALIDATION:
const signUpValidation = data => {
    const schema = Joi.object({
        FirstName: Joi.string()
                 .min(3)
                 .required(),
        LastName: Joi.string()
                .min(3)
                .required(),
        Suburb: Joi.string()
                .min(3)
                .required(),
        EmailAddress: Joi.string().min(3)
                         .required()
                         .email(),
        Age: Joi.number().min(1).required(),
        Password: Joi.string()
                     .min(6)
                     .required()
    });

    return schema.validate(data); 
}

const loginValidation = data => {
    const schema = Joi.object({
        EmailAddress: Joi.string().min(3)
                         .required()
                         .email(),
        Password: Joi.string()
                     .min(6)
                     .required()
    });

    return schema.validate(data); 
}

module.exports.signUpValidation = signUpValidation;
module.exports.loginValidation = loginValidation;
