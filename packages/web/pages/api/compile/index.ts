// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import solc from 'solc';
import fs from 'fs';
import path from 'path';
import { CompilationError } from '@modules/compiler/types/sol';

type RequestData = {
  conversationId: string;
  message: string;
};

type ResponseData = {
  bytecode?: any;
  abi?: any;
  errors?: string[];
};

type ResponseError = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>,
) {
  try {
    console.log('compiling...');

    if (req.method === 'POST') {
      // const { conversationId, message, messageType }: RequestData = req.body;

      // apiSendMessage({ conversationId, sender: user.wallet, message, messageType }).then(() => {
      //   return res.status(200).json({ message: 'Success' });
      // });

      // Read the source code of the imported contracts
      const erc20Source = fs.readFileSync(
        path.join('node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol'),
        'utf-8',
      );
      const ierc20Source = fs.readFileSync(
        path.join(
          'node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol',
        ),
        'utf-8',
      );
      const ierc20MetadataSource = fs.readFileSync(
        path.join(
          'node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol',
        ),
        'utf-8',
      );
      const contextSource = fs.readFileSync(
        path.join('node_modules/@openzeppelin/contracts/utils/Context.sol'),
        'utf-8',
      );

      // Your contract code as a string
      const input = `
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

      contract MyToken is ERC20 {
          constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
              _mint(msg.sender, initialSupply);
          }
      }
      `;

      const inputJson = {
        language: 'Solidity',
        sources: {
          'MyToken.sol': {
            content: input,
          },
          '@openzeppelin/contracts/token/ERC20/ERC20.sol': {
            content: erc20Source,
          },
          '@openzeppelin/contracts/token/ERC20/IERC20.sol': {
            content: ierc20Source,
          },
          '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol': {
            content: ierc20MetadataSource,
          },
          '@openzeppelin/contracts/utils/Context.sol': {
            content: contextSource,
          },
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*'],
            },
          },
        },
      };

      const output = JSON.parse(solc.compile(JSON.stringify(inputJson)));

      // console.log(output);

      // Check for compile errors
      const compileErrors: CompilationError[] =
        output.errors &&
        output.errors.filter((error) => error.severity === 'error');
      if (compileErrors && compileErrors.length > 0) {
        const errors = compileErrors.map((err) => err.message);
        return res.status(200).json({ errors });
      }

      // The compiled contract ABI and bytecode
      const contract = output.contracts['MyToken.sol']['MyToken'];
      const bytecode = contract.evm.bytecode.object;
      const abi = contract.abi;

      res.status(200).json({ bytecode, abi });
    } else {
      return res.status(400).json({ message: 'HTTP status not supported.' });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: 'An error has occured on the server.' });
  }
}
