import { Blockchains } from '@core/enums/blockchains';
import { en } from '@locales/english';

export const getTranslation = (blockchain: Blockchains) => {
  return en[blockchain.toLowerCase()];
};

export const formatTranslation = (
  content: string,
  params: Record<string, string>,
): string => {
  let result = content;

  Object.entries(params).forEach(([key, value]) => {
    result = result.replaceAll(`{${key}}`, value ?? '');
  });

  return result;
};
