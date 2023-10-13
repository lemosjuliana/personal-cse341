const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    species: String,
    breed: String,
    color: String,
    gender: String,
    age: Number,
    owner: {
        ownerName: String,
        ownerEmail: String,
        ownerPhoneNumber: String,
        ownerAddress: String
    },
    vaccines: [{
        vaccineType: String,
        date: Date,
        secondDose: Boolean
    }],
    vet: {
        vetName: String,
        vetSpecialization: [String],
        vetEmail: String,
        vetPhoneNumber: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
