import { ethers } from "ethers";
import FreelanceJobJSON from "../../abis/FreelanceJob.json";
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FreelanceJobABI = FreelanceJobJSON.abi;

const FreelanceJobModule = buildModule("FreelanceJobModule", (m) => {
  const freelancerAddress = "0x55Db1ecBe7519ec316C884F6B6Cc06B4eB071a85";
  const daoContract = "0x8b0b50C2C673Dd5cA20C918345F30f64fB6c159F";

  const amounts = [
    ethers.parseEther("0.015").toString(), // 0.015 ETH
    ethers.parseEther("0.015").toString(), // 0.015 ETH
  ];

  const deadlines = [
    Math.floor(Date.now() / 1000) + 86400,
    Math.floor(Date.now() / 1000) + 172800,
  ];

  const freelanceJob = m.contract(
    "FreelanceJob",
    [freelancerAddress, amounts, deadlines, daoContract],
    {
      value: ethers.parseEther("0.03"), // 0.015 + 0.015 = 0.03 ETH
    }
  );

  return { freelanceJob };
});

export default FreelanceJobModule;

class FreelanceJobContract {
  private contract: ethers.Contract;

  constructor(
    providerOrSigner: ethers.Provider | ethers.Signer,
    contractAddress: string
  ) {
    this.contract = new ethers.Contract(
      contractAddress,
      FreelanceJobABI,
      providerOrSigner
    );
  }

  private withSigner(signer: ethers.Signer): ethers.Contract {
    return this.contract.connect(signer) as ethers.Contract;
  }

  // Accept contract as client or freelancer
  async acceptContract(signer: ethers.Signer): Promise<void> {
    const tx = await this.withSigner(signer).acceptContract();
    await tx.wait();
  }

  async submitMilestone(
    signer: ethers.Signer,
    id: number,
    ipfsCID: string
  ): Promise<void> {
    const tx = await this.withSigner(signer).submitMilestone(id, ipfsCID);
    await tx.wait();
  }

  async approveMilestone(signer: ethers.Signer, id: number): Promise<void> {
    const tx = await this.withSigner(signer).approveMilestone(id);
    await tx.wait();
  }

  async releaseMilestonePayment(
    signer: ethers.Signer,
    id: number
  ): Promise<void> {
    const tx = await this.withSigner(signer).releaseMilestonePayment(id);
    await tx.wait();
  }

  async raiseDispute(signer: ethers.Signer, id: number): Promise<void> {
    const tx = await this.withSigner(signer).raiseDispute(id);
    await tx.wait();
  }

  async disputeContract(
    signer: ethers.Signer,
    proposalId: number
  ): Promise<void> {
    const tx = await this.withSigner(signer).disputeContract(proposalId);
    await tx.wait();
  }

  async resolveDispute(
    signer: ethers.Signer,
    amountToFreelancer: number,
    amountToClient: number
  ): Promise<void> {
    const tx = await this.withSigner(signer).resolveDispute(
      amountToFreelancer,
      amountToClient
    );
    await tx.wait();
  }

  async getMilestone(id: number): Promise<[bigint, bigint, string, number]> {
    return this.contract.getMilestone(id);
  }

  async milestoneCount(): Promise<number> {
    const count: bigint = await this.contract.milestoneCount();
    return Number(count);
  }

  async getEscrowBalance(): Promise<bigint> {
    return this.contract.getEscrowBalance();
  }

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

export { FreelanceJobContract };
