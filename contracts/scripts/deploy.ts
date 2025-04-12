const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Freelancer = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const DAO = "0x8b0b50C2C673Dd5cA20C918345F30f64fB6c159F";
  const milestoneAmounts = [
    hre.ethers.parseEther("0.001"), // 0.001 ETH
    hre.ethers.parseEther("0.002"), // 0.002 ETH
  ]; // Total: 0.003 ETH

  const milestoneDeadlines = [
    Math.floor(Date.now() / 1000) + 86400,
    Math.floor(Date.now() / 1000) + 172800,
  ];

  const FreelanceJob = await hre.ethers.getContractFactory("FreelanceJob");
  // Updated to ethers v6 syntax
  const contract = await FreelanceJob.deploy(
    Freelancer,
    milestoneAmounts,
    milestoneDeadlines,
    DAO,
    { value: hre.ethers.parseEther("0.003") }
  );

  // Wait for the contract to be deployed
  await contract.waitForDeployment();
  // Get the deployed contract address using the new method
  console.log("FreelanceJob deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
