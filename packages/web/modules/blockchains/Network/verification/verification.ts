declare let window: any;
import Web3 from 'web3';

export const signNetworkSignature = async (message: string): Promise<string> => {
  const ethereum = window.ethereum;
  if (ethereum && ethereum.isMetaMask) {
    const web3 = new Web3(ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const signature = await ethereum.request({
      method: 'personal_sign',
      params: [message, account],
    });

    return signature;
  } else {
    return '';
  }
};

export const verifyNetworkSignature = async (
  message: string,
  signature: string,
  address: string,
): Promise<boolean> => {
  console.log('verifyNetworkSignature');

  const web3 = new Web3('https://rpc.ankr.com/zetachain_evm_athens_testnet'); //  RPC

  const messageHash = web3.utils.sha3(message);
  const pubKey = web3.eth.accounts.recover(messageHash, signature);
  const signer = web3.utils.toChecksumAddress(pubKey);
  const original = web3.utils.toChecksumAddress(address);

  console.log(`successful verification: ${signer === original}`);
  return signer === original;
};





// declare let window: any;
// import Web3 from 'web3';

// // Define RPC endpoints for each network
// const rpcEndpoints: { [network: string]: string } = {
//   zetamainnet: 'https://zetarpc.com',
//   zetatestnet: 'https://rpc.ankr.com/zetachain_evm_athens_testnet',
//   // Add more networks here as needed
// };

// export const signNetworkSignature = async (message: string): Promise<string> => {
//   const ethereum = window.ethereum;
//   if (ethereum && ethereum.isMetaMask) {
//     const web3 = new Web3(ethereum);
//     const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//     const account = accounts[0];
//     const signature = await ethereum.request({
//       method: 'personal_sign',
//       params: [message, account],
//     });

//     return signature;
//   } else {
//     return '';
//   }
// };

// export const verifyNetworkSignature = async (
//   message: string,
//   signature: string,
//   address: string,
// ): Promise<boolean> => {
//   console.log('verifyNetworkSignature');

//   const ethereum = window.ethereum;
//   if (ethereum && ethereum.isMetaMask) {
//     const currentChainId = await ethereum.request({ method: 'eth_chainId' });
//     const currentNetwork = getNetworkFromChainId(currentChainId);
//     const rpcEndpoint = rpcEndpoints[currentNetwork];
    
//     if (!rpcEndpoint) {
//       throw new Error(`Unsupported network: ${currentNetwork}`);
//     }

//     const web3 = new Web3(rpcEndpoint);
//     const messageHash = web3.utils.sha3(message);
//     const pubKey = web3.eth.accounts.recover(messageHash, signature);
//     const signer = web3.utils.toChecksumAddress(pubKey);
//     const original = web3.utils.toChecksumAddress(address);

//     console.log(`successful verification: ${signer === original}`);
//     return signer === original;
//   }

//   return false;
// };

// const getNetworkFromChainId = (chainId: string): string => {
//   switch (chainId) {
//     case '00000':
//       return 'zetamainnet';
//     case '7001':
//       return 'zetatestnet';
//     default:
//       return '';
//   }
// };

