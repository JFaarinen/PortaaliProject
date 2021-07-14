const mongoose = require('mongoose');

const tuoteSchema = new mongoose.Schema({
    nimi: {
        type: String,
        require: true
    },
    kategoriat: Array,
    hinta: Number,
    lkm: Number,
    kuvaus: String,
    img: {
        type: [String],
        require: false
    }
});

tuoteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Tuote', tuoteSchema);