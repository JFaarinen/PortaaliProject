const mongoose = require('mongoose');

const larpSchema = new mongoose.Schema({
    pelinNimi: { type: String, required: true },
    kuvaus: { type: String, required: true },
    kansikuva: {
        kuvatiedosto: { type: String },
    },
});

larpSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Larp', larpSchema);