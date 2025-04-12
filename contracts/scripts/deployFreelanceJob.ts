import { ethers } from "ethers";
import hre from "hardhat";
import { Wallet } from "ethers";
import FreelanceJobModule from "../ignition/modules/FreelanceJob";

/**
 * This script allows your frontend to deploy FreelanceJob contracts dynamically.
 *
 * Example usage from your JavaScript/TypeScript frontend:
 * const response = await fetch('/api/deploy-contract', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     freelancerAddress: "0x123...",
 *     daoAddress: "0x456...",
 *     milestones: [
 *       { amount: "0.1", deadline: "2023-05-01" },
 *       { amount: "0.2", deadline: "2023-05-15" }
 *     ]
 *   })
 * });
 * const { contractAddress } = await response.json();
 */

async function deployFreelanceJob(
  freelancerAddress: string,
  daoAddress: string,
  milestoneAmounts: bigint[], // in wei
  milestoneDeadlines: bigint[], // as timestamps
  deployerPrivateKey?: string
): Promise<string> {
  try {
    // Calculate total escrow amount
    const totalEscrow = milestoneAmounts.reduce(
      (sum, amount) => sum + amount,
      0n
    );

    console.log(`Deploying FreelanceJob contract:`);    
    console.log(`- Freelancer: ${freelancerAddress}`);
    console.log(`- DAO: ${daoAddress}`);
    console.log(`- Milestones: ${milestoneAmounts.length}`);
    console.log(`- Total Escrow: ${ethers.formatEther(totalEscrow)} ETH`);

    // Deploy using Hardhat Ignition with CORRECT parameter names
    const result = await hre.ignition.deploy(FreelanceJobModule, {
      parameters: {
        //@ts-ignore
        freelancer: freelancerAddress,
        //@ts-ignore
        daoContract: daoAddress,
        //@ts-ignore
        amounts: milestoneAmounts,
        //@ts-ignore
        deadlines: milestoneDeadlines,
        //@ts-ignore
        totalEscrow: totalEscrow,
      },
    });

    const contractAddress = await result.freelanceJob.address;
    console.log(`Contract deployed at ${contractAddress}`);

    return contractAddress as any;
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

// Helper function to convert ETH value to wei
function ethToWei(ethAmount: string): bigint {
  return ethers.parseEther(ethAmount);
}

// Helper function to convert date string to Unix timestamp
function dateToTimestamp(dateString: string): bigint {
  return BigInt(Math.floor(new Date(dateString).getTime() / 1000));
}

// For direct execution via CLI
if (require.main === module) {
  // Example CLI usage
  const freelancer = process.argv[2];
  const dao = process.argv[3];

  if (!freelancer || !dao) {
    console.log(
      "Usage: npx ts-node scripts/deployFreelanceJob.ts <freelancerAddress> <daoAddress>"
    );
    process.exit(1);
  }

  // Example milestones (modify as needed for CLI testing)
  const amounts = [ethToWei("0.01"), ethToWei("0.02")];
  const now = Math.floor(Date.now() / 1000);
  const deadlines = [BigInt(now + 7 * 86400), BigInt(now + 14 * 86400)];

  deployFreelanceJob(freelancer, dao, amounts, deadlines)
    .then((address) => {
      console.log(`Deployment successful! Contract address: ${address}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error("Deployment failed:", error);
      process.exit(1);
    });
}

export { deployFreelanceJob, ethToWei, dateToTimestamp };
