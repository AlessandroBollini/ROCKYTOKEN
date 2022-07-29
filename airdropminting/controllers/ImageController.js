const db=require('../models/NFTModels');

exports.findAllImages=async()=>{
    const uris=[];
    await db.Image.findAll({where:{used:false}})
    .then((data)=>{
        data.forEach(element => {
            let uri=element.uri;
            uris.push(uri);
            db.Image.update({used:true},{where:{uri:element.uri}})
            .then(()=>{
                console.log("");
            })
            .catch((err)=>{
                console.error(err);
            })
        });
    })
    .catch((err)=>{
        console.error(err);
    })
    return uris;
}