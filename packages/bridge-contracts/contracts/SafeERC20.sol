pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SafeERC20 is IERC20 {
    function safeTransfer(address _to, uint256 _value) external {
        transfer(_to, _value);
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external {
        transferFrom(_from, _to, _value);
    }

    function safeApprove(address _spender, uint256 _value) external {
        approve(_spender, _value);
    }
}
