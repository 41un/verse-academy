// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract VerseLearn is Ownable {
    using SafeERC20 for IERC20;

    // State variables
    mapping(address => uint) public currentCheckPoint;
    mapping(address => bytes32[]) public passwords;
    mapping(address => bool) public hasClaimedETH; // For ETH faucet

    address constant TOKEN_ADDRESS = 0x37D4203FaE62CCd7b1a78Ef58A5515021ED8FD84;
    uint256 constant FAUCET_AMOUNT_ETH = 0.01 ether;  // Amount for the ETH faucet

    // Constructor
    constructor() {}

    // Function to deposit ETH into the contract
    function depositETH() external payable {}

    // Function for users to claim ETH from the faucet
    function claimETH() public {
        require(currentCheckPoint[msg.sender] > 0, "Error: Address is not registered (whitelisted). Cannot claim ETH.");
        require(!hasClaimedETH[msg.sender], "Error: You have already claimed your ETH from the faucet.");
        hasClaimedETH[msg.sender] = true;
        payable(msg.sender).transfer(FAUCET_AMOUNT_ETH);
    }

    // Function to register users
    function registerUser(address _userToRegister) public onlyOwner {
        require(currentCheckPoint[_userToRegister] == 0, "Error: User already registered.");
        currentCheckPoint[_userToRegister] = 1; // 1 is the first checkpoint, it just means the user is registered
    }

    // Function for users to save their progress
    function checkpointSave(uint level) public {
        require(currentCheckPoint[msg.sender] > 0, "Error: Address is not registered. Cannot save checkpoint.");
        require(level > currentCheckPoint[msg.sender], "Error: You cannot lower your checkpoint level.");
        currentCheckPoint[msg.sender] = level;
    }

    // Function for users to receive rewards
    function receiveReward() public {
        require(currentCheckPoint[msg.sender] >= 5, "Error: Address has not finished all 5 levels. Cannot receive reward.");
        IERC20(TOKEN_ADDRESS).safeTransfer(msg.sender, 1 ether);
    }

    // Function to check the ERC20 balance of the contract
    function getERC20Balance() public view returns (uint256) {
        return IERC20(TOKEN_ADDRESS).balanceOf(address(this));
    }

    // Function to check the ETH balance of the contract
    function getETHBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
