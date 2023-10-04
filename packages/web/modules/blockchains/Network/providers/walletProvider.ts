import { Environments } from '@core/enums/environments';
import Web3 from 'web3';

declare let window: any;

export const getProvider = (): any => {
  return window.ethereum;
};

export const isProviderAvailable = (): boolean => {
  return typeof window.ethereum !== 'undefined';
};

export const connectWallet = async () => {
  await window.ethereum?.request({ method: 'eth_requestAccounts' });
};

export const isWalletReady = (): boolean => {
  return window.ethereum && window.ethereum.isMetaMask;
};

export const isWalletConnected = (): boolean => {
  return window.ethereum?.selectedAddress;
};

export interface Wallet {
  address: string;
  network: Network;
}

export enum Network {
  ZetaMainnet = 'ZetaMainnet',
  ZetaTestnet = 'ZetaTestnet',
  Unknown = 'Unknown'
}

export const getWallet = async (): Promise<Wallet | null> => {
  const isConnected = isWalletConnected();
  if (isConnected) {
    return {
      address: window.ethereum.selectedAddress,
      network: getNetwork(),
    };
  } else {
    return null;
  }
};

export const getNetwork = (): Network => {
  return window.ethereum.networkVersion === '00000'
    ? Network.ZetaMainnet
    : window.ethereum.networkVersion === '7001'
    ? Network.ZetaTestnet
    : Network.Unknown
    
};

export const maskWalletAddress = (address: string): string => {
  if (address && address.length > 9) {
    return (
      address.substring(0, 5) + '...' + address.substring(address.length - 4)
    );
  } else {
    return address;
  }
};

export const shortenHash = (
  hash: string,
  startLength = 6,
  endLength = 4,
): string => {
  return hash
    ? `${hash.substring(0, startLength)}...${hash.substring(
        hash.length - endLength,
      )}`
    : '';
};

export const getExplorerAddressUrl = (
  environment: Environments,
  hash: string,
): string => {
  if (environment === Environments.ZetaMainnet) {
    return `https://scan.Zeta.network/address/${hash}`;
  }
  if (environment === Environments.ZetaTestnet) {
    return `https://explorer.zetachain.com/address/${hash}`;
  }
  return null;
};

export const getExplorerTxUrl = (
  environment: Environments,
  hash: string,
): string => {
  if (environment === Environments.ZetaMainnet) {
    return `https://scan.Zeta.network/tx/${hash}`;
  }
  if (environment === Environments.ZetaTestnet) {
    return `https://explorer.zetachain.com/tx/${hash}`;
  }
  return null;
};

export const deployContract = async (
  byteCode: string,
  abi: any,
  args: any,
  environment: Environments,
  gasLimit: string,
): Promise<{ contractAddress: string; transactionHash: string }> => {
  console.log(`[deployContract] gasLimit: ${gasLimit}`);
  console.log(`[deployContract] args: ${args}`);

  // check if provider is available
  if (!isProviderAvailable()) {
    throw new Error('Ethereum provider is not available');
  }

  // connect to the wallet
  await connectWallet();

  // check if the wallet is connected
  if (!isWalletConnected()) {
    throw new Error('Wallet is not connected');
  }

  // get the network
  const currentNetwork = getNetwork();

  // check if the network matches the selected environment
  if (
    (environment === Environments.ZetaMainnet &&
      currentNetwork !== Network.ZetaMainnet) ||
    (environment === Environments.ZetaTestnet &&
      currentNetwork !== Network.ZetaTestnet)
  ) {
    throw new Error(
      'The connected network does not match the selected environment',
    );
  }

  // create a new web3 instance
  const web3 = new Web3(getProvider());

  // get the connected account
  const accounts = await web3.eth.getAccounts();

  if (!accounts || accounts.length === 0) {
    throw new Error('No account is connected');
  }

  // create a new contract instance
  const contract = new web3.eth.Contract(abi);

  // TODO: Calling below function throws this error: {code: 3, message: 'execution reverted: ERC20: mint to the zero address', data: '0x08c379a00000000000000000000000000000000000000000…d696e7420746f20746865207a65726f206164647265737300'}
  // estimate the gas required to deploy the contract
  // const gas = await contract.deploy({ data: byteCode, arguments: [initialSupply] }).estimateGas();

  // deploy the contract
  // const receipt = await contract.deploy({ data: byteCode, arguments: args }).send({ from: accounts[0], gas: gasLimit });

  // return the contract address and the transaction hash
  // return { contractAddress: receipt.options.address, transactionHash: receipt.transactionHash };
  let transactionHash: string;

  const result = await new Promise((resolve, reject) => {
    contract
      .deploy({ data: byteCode, arguments: args })
      .send({ from: accounts[0], gas: gasLimit })
      .on('transactionHash', (hash: string) => {
        transactionHash = hash;
      })
      .on('receipt', resolve)
      .on('error', reject);
  });

  // Cast result to any to be able to access methods not defined in the types
  // const contractAddress = (result as any).options.address;
  const contractAddress = '';

  // Return the contract address and the transaction hash
  return { contractAddress, transactionHash };
};
