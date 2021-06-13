const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

console.log('connecting to ', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(res => {
        console.log('connected to Portaali DB');
    })
    .catch((error) => {
        console.log('error connecting to PortaaliDB: ', error.message);
    });

const tuoteSchema = new mongoose.Schema({
    nimi: String,
    kategoriat: Array,
    hinta: Number,
    lkm: Number,
    kuvaus: String,
    img: String
});

tuoteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Tuote', tuoteSchema);