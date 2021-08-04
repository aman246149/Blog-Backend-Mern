// validation
const joi = require("@hapi/joi");

//register validation

const registerValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const postFormValidation = (data) => {
  const schema = joi.object({
    title: joi.string().min(6).required(),
    shortDesc: joi.string().min(6).required(),
    markdown: joi.string().min(6).required(),
    postType: joi.string().min(1).required(),
  });


  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.postFormValidation = postFormValidation;
