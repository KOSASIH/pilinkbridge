pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

contract ERC20 is IERC20, SafeERC20 {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}
}
