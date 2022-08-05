const db=require('../models/NFTModels');

exports.findAllAddresses=async ()=>{
    const addresses=[];
    await db.Wallet.findAll({where:{used:false}})
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

exports.setImage=async(address,image)=>{
    await db.Wallet.update({image:image},{where:{address:address}})
    .then(()=>{
        console.log("Wallet's image updated");
    })
    .catch((err)=>{
        console.error(err);
    })
}