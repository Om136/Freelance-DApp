import { ethers } from "hardhat";

/**
 * A simplified script to deploy FreelanceJob contracts
 * This script avoids the complexity of Hardhat Ignition
 *
 * Example usage:
 * npx hardhat run scripts/simpleDeployFreelanceJob.ts --network localhost
 */
async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  // Get command line arguments if provided
  const args = process.argv.slice(2);

  // Default values - you can override these with command-line args
  const freelancerAddress = args[0] || deployer.address;
  const daoAddress = args[1] || deployer.address;

  // Default milestone setup (can customize these as needed)
  const now = Math.floor(Date.now() / 1000);
  const oneWeekInSeconds = 7 * 24 * 60 * 60;
  const twoWeeksInSeconds = 14 * 24 * 60 * 60;

  // Milestone amounts (in wei)
  const milestoneAmounts = [
    ethers.parseEther("0.01"), // 0.01 ETH for first milestone
    ethers.parseEther("0.02"), // 0.02 ETH for second milestone
  ];

  // Milestone deadlines (as unix timestamps)
  const milestoneDeadlines = [
    BigInt(now + oneWeekInSeconds),
    BigInt(now + twoWeeksInSeconds),
  ];

  // Calculate total escrow amount needed
  const totalEscrow = milestoneAmounts.reduce(
    (sum, amount) => sum + amount,
    0n
  );

  console.log("----------------------------------------------------");
  console.log("Deploying FreelanceJob contract with parameters:");
  console.log(`Freelancer: ${freelancerAddress}`);
  console.log(`DAO Contract: ${daoAddress}`);
  console.log(
    `Milestone amounts: [${milestoneAmounts
      .map((a) => ethers.formatEther(a))
      .join(", ")}] ETH`
  );
  console.log(`Milestone deadlines: [${milestoneDeadlines.join(", ")}]`);
  console.log(`Total escrow amount: ${ethers.formatEther(totalEscrow)} ETH`);
  console.log("----------------------------------------------------");

  try {
    // Get the FreelanceJob contract factory
    const FreelanceJob = await ethers.getContractFactory("FreelanceJob");

    // Deploy the contract with the milestone parameters and sending the required ETH
    const freelanceJob = await FreelanceJob.deploy(
      freelancerAddress,
      milestoneAmounts,
      milestoneDeadlines,
      daoAddress,
      { value: totalEscrow }
    );

    // Wait for deployment to complete
    await freelanceJob.waitForDeployment();

    const contractAddress = await freelanceJob.getAddress();
    console.log(`FreelanceJob contract deployed to: ${contractAddress}`);
    return contractAddress;
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

// Execute the script directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

// Export for importing in other files
export { main as deployFreelanceJob };
