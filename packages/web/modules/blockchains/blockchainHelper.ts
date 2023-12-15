import { Blockchains } from '@core/enums/blockchains';
import { Network } from './Network/providers/walletProvider';

const blockchainNetworks = {
  pegomainnet: {
    [Blockchains.Network]: Network.PegoMainnet,
  },
  pegotestnet: {
    [Blockchains.Network]: Network.PegoTestnet,
  },
};

export const getBlockchainNetwork = (
  blockchain: Blockchains,
  environment: string,
): Network | null => {
  return blockchainNetworks[environment]?.[blockchain] || null;
};

const blockchainNetworkLabels = {
  pegomainnet: {
    [Blockchains.Network]: 'Pego Mainnet',
  },
  pegotestnet: {
    [Blockchains.Network]: 'Pego Testnet',
  },
};

export const getBlockchainNetworkLabel = (
  blockchain: Blockchains,
  environment: string,
): string => {
  return blockchainNetworkLabels[environment]?.[blockchain] || '';
};
