const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    species: 'required|string',
    breed: 'sometimes|string',
    color: 'sometimes|string',
    gender: 'sometimes|string',
    age: 'integer|min:0'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveReview = (req, res, next) => {
  const validationRule = {
    rating: 'required|integer|between:1,5',
    comment: 'required|string|max:200',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser,
  saveReview
};
