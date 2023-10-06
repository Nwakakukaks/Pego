import { Template } from '../types/template';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
    struct Product {
        uint256 price;
        bool exists;
    }

    mapping (address => mapping(bytes32 => bool)) public subscriptions;
    mapping (bytes32 => Product) public products;

    event ProductAdded(bytes32 indexed productId, uint256 price);
    event Subscribed(address indexed user, bytes32 indexed productId);

    function addProduct(bytes32 productId, uint256 price) public onlyOwner {
        require(!products[productId].exists, "Product already exists");
        require(price > 0, "Price should be greater than 0");

        products[productId] = Product(price, true);

        emit ProductAdded(productId, price);
    }

    function subscribe(bytes32 productId) public payable {
        require(products[productId].exists, "Product does not exist");
        require(msg.value == products[productId].price, "Incorrect value sent");

        subscriptions[msg.sender][productId] = true;

        emit Subscribed(msg.sender, productId);
    }

    function isSubscribed(address user, bytes32 productId) public view returns (bool) {
        return subscriptions[user][productId];
    }

    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '4',
  name: 'One Time Subscription Contract',
  description:
    'A One Time Subscription Contract manages product subscriptions on the blockchain. It allows users to purchase products once, and owners to add products and set prices.',
  tags: ['Subscription'],
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
  ],
};

export default TEMPLATE;
