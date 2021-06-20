const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
        minlength: 5
    },
    etunimi: {
        type: String,
        required: true
    },
    sukunimi: {
        type: String,
        required: true
    },
    salasanaHash: String
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.salasanaHash;
    }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
module.exports = User;