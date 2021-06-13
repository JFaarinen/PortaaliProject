const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://PortaaliAdmin:${password}@cluster0.5dwuy.mongodb.net/PortaaliDB?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const tuoteSchema = new mongoose.Schema({
    nimi: String,
    kategoriat: Array,
    hinta: Number,
    lkm: Number,
    kuvaus: String,
    img: String
});

const Tuote = mongoose.model('Tuote', tuoteSchema);

const tuote = new Tuote({
    nimi: "Lääkärintakki",
    kategoriat: [
        "Vaatetus",
        "Labra",
        "Lääkintä"
    ],
    hinta: 6.50,
    lkm: 8,
    kuvaus: "Lääkärintakkeja, eri kokoja.",
    img: "./images/item-10.jpg"
});

tuote.save().then(res => {
    console.log('tuote lisätty');
    mongoose.connection.close();
});