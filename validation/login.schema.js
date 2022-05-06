// https://joi.dev/api/?v=17.6.0#example
const Joi = require("joi");

const login_schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "edu"] },
  }).required(),
  password: Joi.string().min(4).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()

});

module.exports = {
  login_schema
}
