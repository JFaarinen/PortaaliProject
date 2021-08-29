const mongoose = require('mongoose');

const tuoteSchema = new mongoose.Schema({
    otsikko: { type: String, required: true },
    kuvaus: { type: String, required: true },
    tuoteTiedot: [{
        tuote: { type: String, required: true },
        hinta: { type: Number, default: 0 },
        lkm: { type: Number, default: 1 }
    }],
    img: [{
        otsikko: { type: String },
        kuvaus: { type: String },
        kuvatiedosto: { type: String },
        etusivu: { type: Boolean }
    }],
    hakusanat: [{
        hakusana: { type: String }
    }]
});

tuoteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Tuote', tuoteSchema);