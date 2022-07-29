const express = require('express');
let app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const wController = require('./controllers/WalletController');
const iController = require('./controllers/ImageController');
let wallets = [];
let images = [];

app.get('/wallets', (_req, res) => {
    res.send(wallets);
})

app.post('/addWallet', (req, res) => {
    const wallet = {
        address: req.body.address,
        publicKey: req.body.publicKey,
        privateKey: req.body.privateKey,
        seedPhrase: req.body.seedPhrase
    }
    wallets.push(wallet);
    wController.add(wallet)
        .then(res.send("Wallet added"));
})

app.get('/images', (_req, res) => {
    res.send(images);
    console.log(typeof (images[0]));
})

app.post('/addImage', (req, res) => {
    const image = {
        uri: req.body.uri
    }
    images.push(image);
    iController.add(image)
        .then(res.send("Image added"));
})

app.listen(8080, () => {
    console.log("App is listening on port 8080");
})