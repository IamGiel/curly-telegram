// https://joi.dev/api/?v=17.6.0#example
const Joi = require("joi");

const registration_schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  password2: Joi.ref("password"),
  terms: Joi.boolean().required(),
  loggedIn: Joi.boolean().required()

})
  .with("password", "password2");


module.exports = {
  registration_schema
}
