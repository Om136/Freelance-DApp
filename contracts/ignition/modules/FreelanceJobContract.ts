import { ethers } from "ethers";

// Define the FreelanceJob contract interface to help with TypeScript typing
interface FreelanceJobInterface extends ethers.BaseContract {
  // View functions
  client(): Promise<string>;
  freelancer(): Promise<string>;
  daoContract(): Promise<string>;
  clientAccepted(): Promise<boolean>;
  freelancerAccepted(): Promise<boolean>;
  contractActive(): Promise<boolean>;
  contractCancelled(): Promise<boolean>;
  totalMilestones(): Promise<bigint>;
  disputeRaised(): Promise<boolean>;

  // Main contract functions
  acceptContract(): Promise<ethers.TransactionResponse>;
  submitMilestone(
    id: ethers.BigNumberish,
    _cid: string
  ): Promise<ethers.TransactionResponse>;
  approveMilestone(
    id: ethers.BigNumberish
  ): Promise<ethers.TransactionResponse>;
  releaseMilestonePayment(
    id: ethers.BigNumberish
  ): Promise<ethers.TransactionResponse>;
  raiseDispute(id: ethers.BigNumberish): Promise<ethers.TransactionResponse>;
  disputeContract(
    _proposalId: ethers.BigNumberish
  ): Promise<ethers.TransactionResponse>;
  resolveDispute(
    amountToFreelancer: ethers.BigNumberish,
    amountToClient: ethers.BigNumberish
  ): Promise<ethers.TransactionResponse>;

  // View functions for getting data
  getMilestone(
    id: ethers.BigNumberish
  ): Promise<[bigint, bigint, string, number]>;
  milestoneCount(): Promise<bigint>;
  getEscrowBalance(): Promise<bigint>;
}

// Define the complete FreelanceJob contract ABI
const FreelanceJobABI = [
  // View functions for state variables
  "function client() external view returns (address)",
  "function freelancer() external view returns (address)",
  "function daoContract() external view returns (address)",
  "function clientAccepted() external view returns (bool)",
  "function freelancerAccepted() external view returns (bool)",
  "function contractActive() external view returns (bool)",
  "function contractCancelled() external view returns (bool)",
  "function totalMilestones() external view returns (uint256)",
  "function disputeRaised() external view returns (bool)",

  // Main contract functions
  "function acceptContract() external",
  "function submitMilestone(uint256 id, string memory _cid) external",
  "function approveMilestone(uint256 id) external",
  "function releaseMilestonePayment(uint256 id) external",
  "function raiseDispute(uint256 id) external",
  "function disputeContract(uint256 _proposalId) external",
  "function resolveDispute(uint256 amountToFreelancer, uint256 amountToClient) external",

  // View functions for getting data
  "function getMilestone(uint256 id) external view returns (uint256 amount, uint256 deadline, string memory ipfsCID, uint8 status)",
  "function milestoneCount() external view returns (uint256)",
  "function getEscrowBalance() external view returns (uint256)",

  // Events
  "event ContractAccepted(address user)",
  "event MilestoneSubmitted(uint256 indexed id, string ipfsCID)",
  "event MilestoneApproved(uint256 indexed id)",
  "event MilestonePaid(uint256 indexed id, uint256 amount)",
  "event MilestoneDisputed(uint256 indexed id, address triggeredBy)",
  "event ContractDisputeRaised(address triggeredBy)",
  "event DisputeProposalLinked(uint256 proposalId)",
  "event ContractResolved(uint256 paidToFreelancer, uint256 refundedToClient)",
];

/**
 * Interface for interacting with the FreelanceJob smart contract
 */
export class FreelanceJobContract {
  private contract: FreelanceJobInterface;

  constructor(provider: ethers.Provider, contractAddress: string) {
    this.contract = new ethers.Contract(
      contractAddress,
      FreelanceJobABI,
      provider
    ) as unknown as FreelanceJobInterface;
  }

  // View functions for state variables
  async getClient(): Promise<string> {
    return await this.contract.client();
  }

  async getFreelancer(): Promise<string> {
    return await this.contract.freelancer();
  }

  async getDaoContract(): Promise<string> {
    return await this.contract.daoContract();
  }

  async isClientAccepted(): Promise<boolean> {
    return await this.contract.clientAccepted();
  }

  async isFreelancerAccepted(): Promise<boolean> {
    return await this.contract.freelancerAccepted();
  }

  async isContractActive(): Promise<boolean> {
    return await this.contract.contractActive();
  }

  async isContractCancelled(): Promise<boolean> {
    return await this.contract.contractCancelled();
  }

  async getTotalMilestones(): Promise<bigint> {
    return await this.contract.totalMilestones();
  }

  async isDisputeRaised(): Promise<boolean> {
    return await this.contract.disputeRaised();
  }

  // Main contract functions
  async acceptContract(signer: ethers.Signer): Promise<void> {
    const contractWithSigner = this.contract.connect(
      signer
    ) as unknown as FreelanceJobInterface;
    const tx = await contractWithSigner.acceptContract();
    await tx.wait();
  }

  async submitMilestone(
    signer: ethers.Signer,
    id: number,
    ipfsCID: string
  ): Promise<void> {
    const contractWithSigner = this.contract.connect(
      signer
    ) as unknown as FreelanceJobInterface;
    const tx = await contractWithSigner.submitMilestone(id, ipfsCID);
    await tx.wait();
  }

  async approveMilestone(signer: ethers.Signer, id: number): Promise<void> {
    const contractWithSigner = this.contract.connect(
      signer
    ) as unknown as FreelanceJobInterface;
    const tx = await contractWithSigner.approveMilestone(id);
    await tx.wait();
  }

  async releaseMilestonePayment(
    signer: ethers.Signer,
    id: number
  ): Promise<void> {
    const contractWithSigner = this.contract.connect(
      signer
    ) as unknown as FreelanceJobInterface;
    const tx = await contractWithSigner.releaseMilestonePayment(id);
    await tx.wait();
  }

  async raiseDispute(signer: ethers.Signer, id: number): Promise<void> {
    const contractWithSigner = this.contract.connect(
      signer
    ) as unknown as FreelanceJobInterface;
    const tx = await contractWithSigner.raiseDispute(id);
    await tx.wait();
  }

  async disputeContract(
    signer: ethers.Signer,
    proposalId: number
  ): Promise<void> {
    const contractWithSigner = this.contract.connect(
      signer
    ) as unknown as FreelanceJobInterface;
    const tx = await contractWithSigner.disputeContract(proposalId);
    await tx.wait();
  }

  async resolveDispute(
    signer: ethers.Signer,
    amountToFreelancer: bigint,
    amountToClient: bigint
  ): Promise<void> {
    const contractWithSigner = this.contract.connect(
      signer
    ) as unknown as FreelanceJobInterface;
    const tx = await contractWithSigner.resolveDispute(
      amountToFreelancer,
      amountToClient
    );
    await tx.wait();
  }

  // View functions for getting data
  async getMilestone(id: number): Promise<{
    amount: bigint;
    deadline: bigint;
    ipfsCID: string;
    status: number;
  }> {
    const [amount, deadline, ipfsCID, status] =
      await this.contract.getMilestone(id);
    return { amount, deadline, ipfsCID, status };
  }

  async milestoneCount(): Promise<bigint> {
    return await this.contract.milestoneCount();
  }

  async getEscrowBalance(): Promise<bigint> {
    return await this.contract.getEscrowBalance();
  }

  // Event listeners
  listenForContractAccepted(callback: (user: string) => void): void {
    this.contract.on("ContractAccepted", callback);
  }

  listenForMilestoneSubmitted(
    callback: (id: number, ipfsCID: string) => void
  ): void {
    this.contract.on("MilestoneSubmitted", callback);
  }

  listenForMilestoneApproved(callback: (id: number) => void): void {
    this.contract.on("MilestoneApproved", callback);
  }

  listenForMilestonePaid(callback: (id: number, amount: bigint) => void): void {
    this.contract.on("MilestonePaid", callback);
  }

  listenForMilestoneDisputed(
    callback: (id: number, triggeredBy: string) => void
  ): void {
    this.contract.on("MilestoneDisputed", callback);
  }

  listenForContractDisputeRaised(
    callback: (triggeredBy: string) => void
  ): void {
    this.contract.on("ContractDisputeRaised", callback);
  }

  listenForDisputeProposalLinked(callback: (proposalId: number) => void): void {
    this.contract.on("DisputeProposalLinked", callback);
  }

  listenForContractResolved(
    callback: (paidToFreelancer: bigint, refundedToClient: bigint) => void
  ): void {
    this.contract.on("ContractResolved", callback);
  }
}
