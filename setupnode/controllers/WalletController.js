const db = require('../models/NFTModels');

exports.add = async (wallet) => {
    const data = {
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        seedPhrase: wallet.seedPhrase,
        received: false,
        used: false
    }
    await db.Wallet.create(data)
        .then(console.log("Wallet stored on the db"))
        .catch((err) => {
            console.error(err);
        })
}

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
                    used: element.used
                }
                walletsList.push(wallet);
            });
        })
        .catch(err => {
            console.error(err);
        })
    return walletsList;
}