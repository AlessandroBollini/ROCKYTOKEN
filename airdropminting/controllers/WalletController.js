const db=require('../models/NFTModels');

exports.findAllAddresses=async ()=>{
    const addresses=[];
    await db.Wallet.findAll()
    .then((data)=>{
        data.forEach(element => {
            let address=element.address;
            addresses.push(address);
        });
    })
    .catch((err)=>{
        console.error(err);
    })
    return addresses;
}