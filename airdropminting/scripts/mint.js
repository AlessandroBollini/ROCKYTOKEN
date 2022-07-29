const wController = require('../controllers/WalletController');
const Upload = require('../ipfs/upload');

const existingContractAddr = "0xE15724A9DAA1e2cf54e3718ef7024a9a531d9557";

async function main() {
  const friends = await wController.findAllAddresses();
  const tokenURIs = await Upload.run();
  console.log(friends);
  console.log(tokenURIs);
  const nft = await hre.ethers.getContractAt("RockyToken", existingContractAddr);
  const signer0 = await ethers.provider.getSigner(0);
  const nonce = await signer0.getTransactionCount();
  for (let i = 0; i < friends.length; i++) {
    await nft.awardItem(friends[i], tokenURIs[i].path, {
      nonce: nonce + i
    });
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
