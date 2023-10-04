import { Blockchains } from '@core/enums/blockchains';
import { Network } from './Network/providers/walletProvider';

const blockchainNetworks = {
  zetamainnet: {
    [Blockchains.Network]: Network.ZetaMainnet,
  },
  zetatestnet: {
    [Blockchains.Network]: Network.ZetaTestnet,
  },
};

export const getBlockchainNetwork = (
  blockchain: Blockchains,
  environment: string,
): Network | null => {
  return blockchainNetworks[environment]?.[blockchain] || null;
};

const blockchainNetworkLabels = {
  zetamainnet: {
    [Blockchains.Network]: 'Zeta Mainnet',
  },
  zetatestnet: {
    [Blockchains.Network]: 'Zeta Testnet',
  },
};

export const getBlockchainNetworkLabel = (
  blockchain: Blockchains,
  environment: string,
): string => {
  return blockchainNetworkLabels[environment]?.[blockchain] || '';
};
