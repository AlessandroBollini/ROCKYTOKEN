const { create } = require("ipfs-http-client");
const iController=require('../controllers/ImageController');

const ipfs = create("https://ipfs.infura.io:5001");

exports.run=async ()=>{
  let results=[];
  const uris=await iController.findAllImages();
  Promise.all(uris.map(async uri=>{
    const files = [{
      path: '/',
      content: JSON.stringify({
        name: "Rocky Token",
        image: uri,
        description: "First Rocky Token"
      })
    }];
  
    const result = await ipfs.add(files);
    results.push(result);
  }))
  return results;
}