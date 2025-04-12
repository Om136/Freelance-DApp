// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FreelanceJob {
    address public client;
    address public freelancer;
    address public daoContract;

    bool public clientAccepted;
    bool public freelancerAccepted;
    bool public contractActive;
    bool public contractCancelled;

    uint256 public totalMilestones;
    bool public disputeRaised;

    enum MilestoneStatus { Pending, Submitted, Approved, Paid, Disputed }

    struct Milestone {
        uint256 amount;
        uint256 deadline;
        string ipfsCID;
        MilestoneStatus status;
    }

    struct ContractDispute {
        uint256 proposalId;
        bool resolved;
    }

    Milestone[] public milestones;
    ContractDispute public contractDispute;

    event ContractAccepted(address user);
    event MilestoneSubmitted(uint256 indexed id, string ipfsCID);
    event MilestoneApproved(uint256 indexed id);
    event MilestonePaid(uint256 indexed id, uint256 amount);
    event MilestoneDisputed(uint256 indexed id, address triggeredBy);
    event ContractDisputeRaised(address triggeredBy);
    event DisputeProposalLinked(uint256 proposalId);
    event ContractResolved(uint256 paidToFreelancer, uint256 refundedToClient);

    modifier onlyClient() {
        require(msg.sender == client, "Only client");
        _;
    }

    modifier onlyFreelancer() {
        require(msg.sender == freelancer, "Only freelancer");
        _;
    }

    modifier onlyActive() {
        require(contractActive, "Contract not active");
        require(!contractCancelled, "Contract cancelled");
        _;
    }

    modifier onlyDAO() {
        require(msg.sender == daoContract, "Only DAO can resolve");
        _;
    }

    constructor(
        address _freelancer,
        uint256[] memory _amounts,
        uint256[] memory _deadlines,
        address _daoContract
    ) payable {
        require(_freelancer != address(0), "Invalid freelancer");
        require(_daoContract != address(0), "Invalid DAO");
        require(_amounts.length == _deadlines.length, "Mismatched arrays");
        require(_amounts.length > 0, "No milestones");

        client = msg.sender;
        freelancer = _freelancer;
        daoContract = _daoContract;

        uint256 total = 0;
        for (uint256 i = 0; i < _amounts.length; i++) {
            milestones.push(Milestone({
                amount: _amounts[i],
                deadline: _deadlines[i],
                ipfsCID: "",
                status: MilestoneStatus.Pending
            }));
            total += _amounts[i];
        }

        totalMilestones = _amounts.length;
        require(msg.value == total, "Incorrect escrow");
    }

    function acceptContract() external {
        require(msg.sender == client || msg.sender == freelancer, "Not a party");

        if (msg.sender == client) {
            clientAccepted = true;
        } else {
            freelancerAccepted = true;
        }

        emit ContractAccepted(msg.sender);

        if (clientAccepted && freelancerAccepted) {
            contractActive = true;
        }
    }

    function submitMilestone(uint256 id, string memory _cid) external onlyFreelancer onlyActive {
        require(id < milestones.length, "Invalid ID");
        Milestone storage m = milestones[id];
        require(m.status == MilestoneStatus.Pending, "Already submitted");

        m.ipfsCID = _cid;
        m.status = MilestoneStatus.Submitted;

        emit MilestoneSubmitted(id, _cid);
    }

    function approveMilestone(uint256 id) external onlyClient onlyActive {
        require(id < milestones.length, "Invalid ID");
        Milestone storage m = milestones[id];
        require(m.status == MilestoneStatus.Submitted, "Not submitted");

        m.status = MilestoneStatus.Approved;

        emit MilestoneApproved(id);
    }

    function releaseMilestonePayment(uint256 id) external onlyClient onlyActive {
        require(id < milestones.length, "Invalid ID");
        Milestone storage m = milestones[id];
        require(m.status == MilestoneStatus.Approved, "Not approved");

        m.status = MilestoneStatus.Paid;
        payable(freelancer).transfer(m.amount);

        emit MilestonePaid(id, m.amount);
    }

    function raiseDispute(uint256 id) external onlyActive {
        require(id < milestones.length, "Invalid ID");
        require(msg.sender == client || msg.sender == freelancer, "Unauthorized");

        Milestone storage m = milestones[id];
        require(
            m.status == MilestoneStatus.Submitted || m.status == MilestoneStatus.Approved,
            "Not disputable"
        );

        m.status = MilestoneStatus.Disputed;
        emit MilestoneDisputed(id, msg.sender);
    }

    function disputeContract(uint256 _proposalId) external onlyClient onlyActive {
        require(!disputeRaised, "Already disputed");

        disputeRaised = true;
        contractDispute = ContractDispute({
            proposalId: _proposalId,
            resolved: false
        });

        emit ContractDisputeRaised(msg.sender);
        emit DisputeProposalLinked(_proposalId);
    }

    function resolveDispute(uint256 amountToFreelancer, uint256 amountToClient) external onlyDAO {
        require(disputeRaised, "No dispute");
        require(!contractDispute.resolved, "Already resolved");
        require(amountToFreelancer + amountToClient == address(this).balance, "Sum mismatch");

        if (amountToFreelancer > 0) {
            payable(freelancer).transfer(amountToFreelancer);
        }
        if (amountToClient > 0) {
            payable(client).transfer(amountToClient);
        }

        contractActive = false;
        contractCancelled = true;
        contractDispute.resolved = true;

        emit ContractResolved(amountToFreelancer, amountToClient);
    }

    function getMilestone(uint256 id) external view returns (
        uint256 amount,
        uint256 deadline,
        string memory ipfsCID,
        MilestoneStatus status
    ) {
        require(id < milestones.length, "Invalid ID");
        Milestone memory m = milestones[id];
        return (m.amount, m.deadline, m.ipfsCID, m.status);
    }

    function milestoneCount() external view returns (uint256) {
        return milestones.length;
    }

    function getEscrowBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
