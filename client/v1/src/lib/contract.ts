import { ethers } from "ethers";
import FreelanceJobABI from "../abis/FreelanceJob.json";

const provider = new ethers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_INFURA_URL
);

// Contract address from environment variables
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
if (!contractAddress) {
  throw new Error("Contract address not found in environment variables");
}

// Define contract interface
interface FreelanceJobContract extends ethers.BaseContract {
  acceptContract(): Promise<ethers.ContractTransaction>;
  getMilestone(id: number): Promise<MilestoneDetails>;
  submitMilestone(
    milestoneId: number,
    ipfsCID: string
  ): Promise<ethers.ContractTransaction>;
  approveMilestone(milestoneId: number): Promise<ethers.ContractTransaction>;
  releaseMilestonePayment(
    milestoneId: number
  ): Promise<ethers.ContractTransaction>;
  raiseDispute(milestoneId: number): Promise<ethers.ContractTransaction>;
  disputeContract(proposalId: number): Promise<ethers.ContractTransaction>;
  resolveDispute(
    amountToFreelancer: ethers.BigNumberish,
    amountToClient: ethers.BigNumberish
  ): Promise<ethers.ContractTransaction>;
  getEscrowBalance(): Promise<ethers.BigNumberish>;
  totalMilestones(): Promise<ethers.BigNumberish>;
  contractActive(): Promise<boolean>;
  contractDispute(): Promise<DisputeInfo>;
}

// Create the contract instance
const freelanceJobContract = new ethers.Contract(
  contractAddress,
  FreelanceJobABI.abi,
  provider
) as unknown as FreelanceJobContract;

// Define types for milestone status
export interface MilestoneDetails {
  amount: number;
  deadline: number;
  ipfsCID: string;
  status: number;
}

export interface DisputeInfo {
  proposalId: number;
  resolved: boolean;
}

// Function to get the status of a milestone
export async function getMilestoneStatus(
  id: number
): Promise<MilestoneDetails> {
  try {
    const milestone = await freelanceJobContract.getMilestone(id);
    return milestone;
  } catch (err) {
    console.error("Error fetching milestone status:", err);
    throw new Error("Failed to fetch milestone status");
  }
}

// Function to accept the contract (either by client or freelancer)
export async function acceptContract(
  signer: ethers.Signer,
  role: string
): Promise<void> {
  const contractWithSigner = freelanceJobContract.connect(signer);

  try {
    const tx = await contractWithSigner.acceptContract();
    await tx.wait();
    console.log(`${role} accepted the contract`);
  } catch (err) {
    console.error("Error accepting contract:", err);
    throw new Error("Failed to accept contract");
  }
}

// Function to submit a milestone (for freelancer)
export async function submitMilestone(
  signer: ethers.Signer,
  milestoneId: number,
  ipfsCID: string
): Promise<void> {
  const contractWithSigner = freelanceJobContract.connect(signer);

  try {
    const tx = await contractWithSigner.submitMilestone(milestoneId, ipfsCID);
    await tx.wait();
    console.log(`Milestone #${milestoneId} submitted`);
  } catch (err) {
    console.error("Error submitting milestone:", err);
    throw new Error("Failed to submit milestone");
  }
}

// Function to approve a milestone (for client)
export async function approveMilestone(
  signer: ethers.Signer,
  milestoneId: number
): Promise<void> {
  const contractWithSigner = freelanceJobContract.connect(signer);

  try {
    const tx = await contractWithSigner.approveMilestone(milestoneId);
    await tx.wait();
    console.log(`Milestone #${milestoneId} approved`);
  } catch (err) {
    console.error("Error approving milestone:", err);
    throw new Error("Failed to approve milestone");
  }
}

// Function to release milestone payment (for client)
export async function releaseMilestonePayment(
  signer: ethers.Signer,
  milestoneId: number
): Promise<void> {
  const contractWithSigner = freelanceJobContract.connect(signer);

  try {
    const tx = await contractWithSigner.releaseMilestonePayment(milestoneId);
    await tx.wait();
    console.log(`Payment for milestone #${milestoneId} released`);
  } catch (err) {
    console.error("Error releasing milestone payment:", err);
    throw new Error("Failed to release milestone payment");
  }
}

// Function to raise a dispute for a milestone
export async function raiseDispute(
  signer: ethers.Signer,
  milestoneId: number
): Promise<void> {
  const contractWithSigner = freelanceJobContract.connect(signer);

  try {
    const tx = await contractWithSigner.raiseDispute(milestoneId);
    await tx.wait();
    console.log(`Dispute raised for milestone #${milestoneId}`);
  } catch (err) {
    console.error("Error raising dispute:", err);
    throw new Error("Failed to raise dispute");
  }
}

// Function to dispute the entire contract
export async function disputeContract(
  signer: ethers.Signer,
  proposalId: number
): Promise<void> {
  const contractWithSigner = freelanceJobContract.connect(signer);

  try {
    const tx = await contractWithSigner.disputeContract(proposalId);
    await tx.wait();
    console.log("Contract dispute raised with proposal ID:", proposalId);
  } catch (err) {
    console.error("Error disputing contract:", err);
    throw new Error("Failed to dispute contract");
  }
}

// Function to resolve a dispute (for DAO)
export async function resolveDispute(
  signer: ethers.Signer,
  amountToFreelancer: ethers.BigNumberish,
  amountToClient: ethers.BigNumberish
): Promise<void> {
  const contractWithSigner = freelanceJobContract.connect(signer);

  try {
    const tx = await contractWithSigner.resolveDispute(
      amountToFreelancer,
      amountToClient
    );
    await tx.wait();
    console.log("Dispute resolved");
  } catch (err) {
    console.error("Error resolving dispute:", err);
    throw new Error("Failed to resolve dispute");
  }
}

// Function to get the escrow balance
export async function getEscrowBalance(): Promise<ethers.BigNumber> {
  try {
    const balance = await freelanceJobContract.getEscrowBalance();
    return balance;
  } catch (err) {
    console.error("Error getting escrow balance:", err);
    throw new Error("Failed to get escrow balance");
  }
}

// Function to get total milestones
export async function getTotalMilestones(): Promise<number> {
  try {
    const count = await freelanceJobContract.totalMilestones();
    return count.toNumber();
  } catch (err) {
    console.error("Error getting total milestones:", err);
    throw new Error("Failed to get total milestones");
  }
}

// Function to check if contract is active
export async function isContractActive(): Promise<boolean> {
  try {
    return await freelanceJobContract.contractActive();
  } catch (err) {
    console.error("Error checking if contract is active:", err);
    throw new Error("Failed to check if contract is active");
  }
}

// Function to get dispute information
export async function getContractDispute(): Promise<DisputeInfo> {
  try {
    return await freelanceJobContract.contractDispute();
  } catch (err) {
    console.error("Error getting dispute info:", err);
    throw new Error("Failed to get dispute information");
  }
}
