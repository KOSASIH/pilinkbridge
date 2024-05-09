pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract BridgeToken is ERC20 {
    constructor(uint256 _initialSupply) ERC20("BridgeToken", "BT") {
        _mint(msg.sender, _initialSupply);
        console.log("Minted %d BridgeTokens", _initialSupply);
    }
}
