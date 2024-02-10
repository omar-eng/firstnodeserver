const Joi = require("joi");
const AppError = require("../utils/apperror");

const loginschema = Joi.object({
  email: Joi.string().min(3).email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const logvalid = (req, res, next) => {
  const { error } = loginschema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400, error.details));
  }
  next();
};

module.exports = {
  logvalid,
};
