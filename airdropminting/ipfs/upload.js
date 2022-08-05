const Moralis = require('moralis/node');
const iController=require('../controllers/ImageController');
const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;
const masterKey = process.env.MORALIS_MASTER_KEY;

exports.upload=async ()=> {
    const moralisGateWayIPFAddress = "https://gateway.moralisipfs.com/ipfs";
    await Moralis.start({ serverUrl, appId, masterKey });
    let images={
        uris:[],
        results:[]
    }
    const uris = await iController.findAllImages();
    for (const uri of uris){
        const nftMetaData={
            name:"RockyToken",
            description:"A RockyToken",
            image:uri
        }
        const metaDataFile=new Moralis.File(`${nftMetaData.uri}metadata.json`,{
            base64: Buffer.from(JSON.stringify(nftMetaData)).toString("base64"),
        });
        images.uris.push(uri);
        await metaDataFile.saveIPFS({useMasterKey:true});
        const metaDataFileUrl =await metaDataFile.ipfs();
        const metaDataFileId =await metaDataFileUrl.split("/")[4];
        const metaDataGatewayFileUrlAddress = `${moralisGateWayIPFAddress}/${metaDataFileId}`;
        images.results.push(metaDataGatewayFileUrlAddress);
    }
    console.log(images.uris);
    console.log(images.results);
    return images;
}