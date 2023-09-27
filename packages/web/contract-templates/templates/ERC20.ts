import { Template } from '../types/template';
import OpenZeppelinERC20 from '../packages/@openzeppelin/contracts/token/ERC20/ERC20';
import OpenZeppelinIERC20 from '../packages/@openzeppelin/contracts/token/ERC20/IERC20';
import OpenZeppelinIERC20Metadata from '../packages/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract {{contractName}} is ERC20 {
    constructor(uint256 initialSupply) ERC20("{{tokenName}}", "{{symbol}}") {
        _mint(msg.sender, initialSupply);
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '1',
  name: 'ERC20 Token Contract',
  description:
    'ERC20 is an standard for fungible assets, outlining a common list of rules for tokens to follow, enabling interoperability across different interfaces and dApps.',
  tags: ['Token', 'ERC20'],
  code: CODE.trim(),
  inputs: [
    {
      key: 'tokenName',
      label: 'Token Name',
      description: 'Enter the name of the token',
      dataType: 'string',
      defaultValue: '',
      required: true,
    },
    {
      key: 'symbol',
      label: 'Symbol',
      description: 'Enter the symbol of the token',
      dataType: 'string',
      defaultValue: '',
      required: true,
    },
  ],
  dependencies: [
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
