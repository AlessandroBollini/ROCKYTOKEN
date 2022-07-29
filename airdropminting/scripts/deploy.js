async function main() {
  const RockyToken = await hre.ethers.getContractFactory("RockyToken");
  const nft = await RockyToken.deploy();

  await nft.deployed();

  console.log("RockyToken deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
