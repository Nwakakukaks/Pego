import { Blockchains } from '@core/enums/blockchains';
import axios from 'axios';
import { JWT } from '@core/entities/jwt';
import logger from '@core/logger/logger';
import { UserWallet } from '@core/entities/userWallet';

interface SignInUserProps {
  blockchain: Blockchains;
  walletAddress: string;
  signature: string;
}

export const signInUser = async ({
  blockchain,
  walletAddress,
  signature,
}: SignInUserProps): Promise<string | null> => {
  try {
    logger.logInfo('signInUser', 'Begin');

    if (!walletAddress) {
      return;
    }

    const response = await axios.post('/api/auth/signin', {
      blockchain,
      walletAddress,
      signature,
    });

    if (response.status !== 200 || !response.data) {
      return null;
    }

    const result = response.data as JWT;

    return result.token;
  } catch (e) {
    logger.logError('signInUser', 'Failed', e);
    return null;
  }
};

export const fetchUserWallet = async (
  walletAddress: string,
): Promise<UserWallet | null> => {
  try {
    logger.logInfo('fetchUserWallet', 'Begin');

    if (!walletAddress) {
      return null;
    }

    const response = await axios.get<UserWallet>(
      `/api/users/wallets/${walletAddress}`,
    );

    return response.data;
  } catch (e) {
    logger.logError('fetchUserWallet', 'Failed', e);
    return null;
  }
};
