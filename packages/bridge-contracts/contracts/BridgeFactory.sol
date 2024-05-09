pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract BridgeFactory is Ownable {
    Bridge[] public deployedBridges;

    event BridgeDeployed(address indexed bridgeAddress);

    function createBridge(
        address _piTokenAddress,
        address _priceFeedAddress,
        uint256 _minPrice,
        uint256 _maxPrice
    ) external onlyOwner {
        Bridge bridge = new Bridge(
            _piTokenAddress,
            _priceFeedAddress,
            _minPrice,
            _maxPrice
        );
        deployedBridges.push(bridge);

        console.log(
            "Deployed Bridge contract at address %s",
            address(bridge)
        );

        emit BridgeDeployed(address(bridge));
    }

    function getBridgeCount() external view returns (uint256) {
        return deployedBridges.length;
    }

    function getBridgeAt(uint256 _index) external view returns (Bridge) {
        return deployedBridges[_index];
    }

    function changeOwner(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        _transferOwnership(_newOwner);
    }

    function acceptOwnership() external {
        _acceptOwnership();
    }
}
