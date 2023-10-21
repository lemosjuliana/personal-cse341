const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        species: 'required|string',
        breed: 'string', // Allow it to be a string, but not required
        color: 'string', // Allow it to be a string, but not required
        gender: 'string', // Allow it to be a string, but not required
        age: 'integer|min:0', // Assuming age should be a positive integer or zero
        owner: 'required|object', // Assuming owner is required and an object
        'owner.ownerName': 'required|string',
        'owner.ownerEmail': 'required|email',
        'owner.ownerPhoneNumber': 'required|string|regex:^[0-9]{3}-[0-9]{3}-[0-9]{4}$',
        'owner.ownerAddress': 'required|string',
        vaccines: 'required|array',
        'vaccines.*.vaccineType': 'required|string',
        'vaccines.*.date': 'required|date',
        'vaccines.*.secondDose': 'required|boolean',
        vet: 'required|object', // Assuming vet is required and an object
        'vet.vetName': 'required|string',
        'vet.vetSpecialization': 'array', // Assuming vetSpecialization is an array
        'vet.vetSpecialization.*': 'string', // Assuming each item in vetSpecialization is a string
        'vet.vetEmail': 'required|email',
        'vet.vetPhoneNumber': 'required|string|regex:^[0-9]{3}-[0-9]{3}-[0-9]{4}$'
      };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
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
      res.status(412).send({
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
