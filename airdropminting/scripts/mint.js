const wController = require('../controllers/WalletController');
const Upload = require('../ipfs/upload');

const existingContractAddr = "0xfEd3EAa96b55D967808f229247207c22Bf7Bd5E4";

async function main() {
  const friends = await wController.findAllAddresses();
  const tokenURIs = await Upload.upload();
  const nft = await hre.ethers.getContractAt("RockyToken", existingContractAddr);
  const signer0 = await ethers.provider.getSigner(0);
  const nonce = await signer0.getTransactionCount();
  for (let i = 0; i <friends.length; i++) {
    await nft.awardItem(friends[i], tokenURIs.results[i], {
      nonce: nonce + i
    });
    await wController.setImage(friends[i],tokenURIs.uris[i]);
  }
  console.log(nonce);
  console.log("Minting is complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
