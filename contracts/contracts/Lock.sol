// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract FreelanceJob { 
    address public client;
    address public freelancer;
    uint256 public totalMilestones;

    enum MilestoneStatus { Pending, Submitted, Approved, Paid, Disputed }

    struct Milestone {
        uint256 amount;
        string ipfsCID;
        MilestoneStatus status;
    }

    Milestone[] public milestones;

    event MilestoneSubmitted(uint256 indexed id, string ipfsCID);
    event MilestoneApproved(uint256 indexed id);
    event MilestoneDisputed(uint256 indexed id, address triggeredBy);
    event MilestonePaid(uint256 indexed id, uint256 amount);

    modifier onlyClient() {
        require(msg.sender == client, "Only client can call this");
        _;
    }

    modifier onlyFreelancer() {
        require(msg.sender == freelancer, "Only freelancer can call this");
        _;
    }

    constructor(address _freelancer, uint256[] memory amounts) payable {
        require(_freelancer != address(0), "Invalid freelancer");
        require(amounts.length > 0, "No milestones");

        client = msg.sender;
        freelancer = _freelancer;

        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            milestones.push(Milestone({
                amount: amounts[i],
                ipfsCID: "",
                status: MilestoneStatus.Pending
            }));
            total += amounts[i];
        }

        totalMilestones = amounts.length;
        require(msg.value == total, "Incorrect escrow value");
    }

    function submitMilestone(uint256 id, string memory _cid) external onlyFreelancer {
        require(id < milestones.length, "Invalid milestone ID");
        Milestone storage m = milestones[id];
        require(m.status == MilestoneStatus.Pending, "Milestone not pending");

        m.ipfsCID = _cid;
        m.status = MilestoneStatus.Submitted;

        emit MilestoneSubmitted(id, _cid);
    }

    function approveMilestone(uint256 id) external onlyClient {
        require(id < milestones.length, "Invalid milestone ID");
        Milestone storage m = milestones[id];
        require(m.status == MilestoneStatus.Submitted, "Milestone not submitted");

        m.status = MilestoneStatus.Approved;
        payable(freelancer).transfer(m.amount);
        m.status = MilestoneStatus.Paid;

        emit MilestoneApproved(id);
        emit MilestonePaid(id, m.amount);
    }

    function raiseDispute(uint256 id) external {
        require(id < milestones.length, "Invalid milestone ID");
        require(msg.sender == client || msg.sender == freelancer, "Unauthorized");

        Milestone storage m = milestones[id];
        require(m.status == MilestoneStatus.Submitted, "Only submitted milestones can be disputed");

        m.status = MilestoneStatus.Disputed;
        emit MilestoneDisputed(id, msg.sender);
    }

    function getMilestone(uint256 id) external view returns (
        uint256 amount,
        string memory ipfsCID,
        MilestoneStatus status
    ) {
        require(id < milestones.length, "Invalid milestone ID");
        Milestone storage m = milestones[id];
        return (m.amount, m.ipfsCID, m.status);
    }

    function milestoneCount() external view returns (uint256) {
        return milestones.length;
    }
}
