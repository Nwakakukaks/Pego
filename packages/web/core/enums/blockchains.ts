export enum Blockchains {
  None = '',
  Network = 'Pego Network',
}

export const BlockchainLabelMap = new Map<Blockchains, string>([
  [Blockchains.None, ''],
  [Blockchains.Network, 'Network'],
]);

export const getBlockchainLabel = (
  blockchain: Blockchains,
): string | undefined => BlockchainLabelMap.get(blockchain);

export const getBlockchainBySlug = (slug: string): Blockchains => {
  switch (slug) {
    case 'network':
      return Blockchains.Network;
    default:
      return Blockchains.None;
  }
};
