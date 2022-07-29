const db = require('../models/walletModel');

exports.findWallets = async () => {
    let walletsList = [];
    await db.Wallet.findAll()
        .then((data) => {
            data.forEach(element => {
                const wallet = {
                    address: element.address,
                    publicKey: element.publicKey,
                    privateKey: element.privateKey,
                    seedPhrase: element.seedPhrase,
                    received: element.received,
                    used:element.used
                }
                walletsList.push(wallet);
            });
        })
        .catch(err => {
            console.error(err);
        })
    console.log(walletsList);
    return walletsList;
}

exports.isReceived = async (address) => {
    await db.Wallet.update({ received: true }, { where: { address: address } })
        .then(() => {
            console.log("Updated");
        })
        .catch(err => {
            console.error(err);
        })
}

exports.checkReceived = async (address) => {
    let rec = false;
    await db.Wallet.findByPk(address)
        .then(data => {
            rec = data.received
        })
        .catch(err => {
            console.error(err);
        })
    return rec;
}