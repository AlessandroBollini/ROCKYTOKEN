const express = require('express');
const db = require('./controllers/WalletController');
let parseUrl = require('body-parser');
let encodeUrl = parseUrl.urlencoded({ extended: true });
const webhook = require('./webhook/Webhook');
let app = express();
app.set("view engine", "ejs");

async function main() {
    let moduleSent = new Map();
    let addressesToSend = new Map();
    const list = await db.findWallets();
    list.forEach(wallet => {
        moduleSent.set(wallet.address, false);
        addressesToSend.set(wallet.address, 'none');

        app.get('/' + wallet.address, (_req, res) => {
            res.render("landingPage", { address: wallet.address });
        })

        app.get('/' + wallet.address + '/transfer', (_req, res) => {
            if (!moduleSent.get(wallet.address)) {
                res.render("yesWallet", { address: wallet.address });
            } else {
                res.render("addressSent");
            }
        })

        app.post('/' + wallet.address + '/transfer', encodeUrl, (req, res) => {
            addressesToSend.set(wallet.address, req.body.userAddress);
            res.render("youSure", { address: req.body.userAddress, wallet: wallet.address });
        })

        app.get('/' + wallet.address + '/transferConfirmed',(_req, res) => {
            db.isReceived(wallet.address);
            moduleSent.set(wallet.address, true);
            webhook.sendAddress(wallet.address, addressesToSend.get(wallet.address));
            res.render("confirm", { address: addressesToSend.get(wallet.address), wallet: wallet });
        })

        app.get('/' + wallet.address + '/credentials', (_req, res) => {
            res.render("noWallet", { wallet: wallet });
        })
    });
}

main();

app.listen(3000, () => {
    console.log("App is listening on port 3000");
})