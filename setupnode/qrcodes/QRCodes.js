const fs = require('fs');
const QR = require('qrcode');
const db = require('../controllers/WalletController');

const generateQR = async (url, fileName) => {
    try {
        const code = await QR.toDataURL(url);
        const content = '<!DOCTYPE html><html lang="en"><head> <title>Use your Wallet</title></head><body><h1>Scan this QRCode</h1><img src="' + code + '"/></body> </html>';
        fs.writeFileSync('./qr/' + fileName + '.html', content);
    } catch (err) {
        console.error(err);
    }
}

async function main() {
    const list = await db.findWallets();
    list.forEach(element => {
        const address = element.address;
        generateQR("https://localhost:3000/" + address, address);
    });
}

main();