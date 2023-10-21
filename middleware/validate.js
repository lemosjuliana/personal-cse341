const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    species: 'required|string',
    breed: 'sometimes|string',
    color: 'sometimes|string',
    gender: 'sometimes|string',
    age: 'integer|min:0',
    owner: 'required|object',
    'owner.ownerName': 'required|string',
    'owner.ownerEmail': 'required|email',
    'owner.ownerPhoneNumber': 'required|string|regex:^[0-9]{3}-[0-9]{3}-[0-9]{4}$',
    'owner.ownerAddress': 'required|string',
    vaccines: 'required|array',
    'vaccines.*.vaccineType': 'required|string',
    'vaccines.*.date': 'required|date',
    'vaccines.*.secondDose': 'required|boolean',
    vet: 'required|object',
    'vet.vetName': 'required|string',
    'vet.vetSpecialization': 'array',
    'vet.vetSpecialization.*': 'string',
    'vet.vetEmail': 'required|email',
    'vet.vetPhoneNumber': 'required|string|regex:^[0-9]{3}-[0-9]{3}-[0-9]{4}$'
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
