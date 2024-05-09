pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "hardhat/console.sol";

contract Bridge is Pausable {
    IERC20 public piToken;
    AggregatorV3Interface public priceFeed;
    uint256 public minPrice;
    uint256 public maxPrice;
    mapping(address => uint256) public lastPrices;
    mapping(address => uint256) public balances;

    constructor(
        address _piTokenAddress,
        address _priceFeedAddress,
        uint256 _minPrice,
        uint256 _maxPrice
    ) {
        piToken = IERC20(_piTokenAddress);
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
        minPrice = _minPrice;
        maxPrice = _maxPrice;
    }

    function deposit(uint256 _amount) external {
        require(!paused(), "Bridge is paused");
        require(_amount > 0, "Amount must be greater than zero");
        require(piToken.balanceOf(msg.sender) >= _amount, "Insufficient balance");
        require(getPrice() > minPrice, "Price is too low");
        require(getPrice() < maxPrice, "Price is too high");

        piToken.transferFrom(msg.sender, address(this), _amount);
        balances[msg.sender] += _amount;

        console.log(
            "Deposited %d PI from %s to Bridge contract",
            _amount,
            msg.sender
        );
    }

    function withdraw(uint256 _amount) external {
        require(!paused(), "Bridge is paused");
        require(_amount > 0, "Amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        balances[msg.sender] -= _amount;
        piToken.transfer(msg.sender, _amount);

        console.log(
            "Withdrew %d PI from Bridge contract to %s",
            _amount,
            msg.sender
        );
    }

    function getPrice() external view returns (uint256) {
        (, int256 answer, , ,) = priceFeed.latestRoundData();
        require(answer > 0, "Invalid price");
        return uint256(answer);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function changeMinPrice(uint256 _minPrice) external onlyOwner {
        minPrice = _minPrice;
    }

    function changeMaxPrice(uint256 _maxPrice) external onlyOwner {
        maxPrice = _maxPrice;
    }

    function changePriceFeed(address _priceFeedAddress) external onlyOwner {
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    function changePiToken(address _piTokenAddress) external onlyOwner {
        piToken = IERC20(_piTokenAddress);
    }

    function changeOwner(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        _transferOwnership(_newOwner);
    }

    function acceptOwnership() external {
        _acceptOwnership();
    }
}
