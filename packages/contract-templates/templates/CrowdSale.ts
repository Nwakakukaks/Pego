import { Template } from '../types/template';
import OpenZeppelinERC20 from '../packages/@openzeppelin/contracts/token/ERC20/ERC20';
import OpenZeppelinIERC20 from '../packages/@openzeppelin/contracts/token/ERC20/IERC20';
import OpenZeppelinIERC20Metadata from '../packages/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
    ERC20 public token;
    uint256 public rate;

    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    constructor(uint256 _rate, ERC20 _token) {
        require(_rate > 0);
        require(address(_token) != address(0));

        rate = _rate;
        token = _token;
    }

    receive() external payable {
        buyTokens(msg.sender);
    }

    function buyTokens(address beneficiary) public payable {
        uint256 weiAmount = msg.value;
        _preValidatePurchase(beneficiary, weiAmount);

        uint256 tokens = _getTokenAmount(weiAmount);

        token.transfer(beneficiary, tokens);

        emit TokensPurchased(msg.sender, beneficiary, weiAmount, tokens);
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal pure {
        require(beneficiary != address(0));
        require(weiAmount != 0);
    }

    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount * rate;
    }

    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '3',
  name: 'Crowd Sale Contract',
  description:
    'A Crowd Sale Contract facilitates the raising of funds by selling a ERC20 token to investors at a specific price, in a defined timeframe, directly on the blockchain.',
  tags: ['Token', 'CrowdSale'],
  code: CODE.trim(),
  inputs: [],
  dependencies: [
    {
      path: '@openzeppelin/contracts/access/Ownable.sol',
      fileContent: OpenZeppelinOwnable,
    },
    {
      path: '@openzeppelin/contracts/utils/Context.sol',
      fileContent: OpenZeppelinContext,
    },
    {
      path: '@openzeppelin/contracts/token/ERC20/ERC20.sol',
      fileContent: OpenZeppelinERC20,
    },
    {
      path: '@openzeppelin/contracts/token/ERC20/IERC20.sol',
      fileContent: OpenZeppelinIERC20,
    },
    {
      path: '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol',
      fileContent: OpenZeppelinIERC20Metadata,
    },
    {
      path: '@openzeppelin/contracts/utils/Context.sol',
      fileContent: OpenZeppelinContext,
    },
  ],
};

export default TEMPLATE;
