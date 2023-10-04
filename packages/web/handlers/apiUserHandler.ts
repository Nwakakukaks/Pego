import { JWT } from '@core/entities/jwt';
import logger from '@core/logger/logger';
import { generateToken } from '@modules/jwt/jwtHelper';
import { generateUUID } from '@core/helpers/generateHelper';
import { Blockchains } from '@core/enums/blockchains';
import { FirestoreDB } from '@modules/firebase/firestore';
import { verifyNetworkSignature } from '@modules/blockchains/Network/verification/verification';
import { UserWallet } from '@core/entities/userWallet';
import { getCurrentTimestamp } from '@core/helpers/datetimeHelper';

export interface ApiSignInUserParams {
  blockchain: string;
  walletAddress: string;
  signature: string; 
}

export const apiSignInUser = async (
  params: ApiSignInUserParams,
): Promise<JWT | null> => {
  try {
    logger.logInfo('apiSignInUser', 'Begin', params);

    const { blockchain, walletAddress, signature } = params;

    if (blockchain === Blockchains.Network) {
      const message = 'Zhelp Login';
      const isSignatureValid = verifyNetworkSignature(
        message,
        signature,
        walletAddress,
      );
      if (!isSignatureValid) {
        logger.logWarning('apiSignInUser', 'Invalid signature');
        return null;
      }
    }

    const database = new FirestoreDB();

    // Create new user wallet if not already exist
    let userWallet: UserWallet = await apiFetchUserWallet({ walletAddress });
    if (!userWallet) {
      logger.logInfo(
        'apiSignInUser',
        `Creating new user wallet ${walletAddress}.`,
      );

      userWallet = {
        userId: generateUUID(),
        walletAddress: walletAddress,
        blockchain: blockchain,
        createdDateUTC: getCurrentTimestamp(),
      };

      await database.addUserWallet(userWallet);
    }

    // Generate JWT token
    const tokenPayload = generateToken({ userId: userWallet.userId });
    const result: JWT = {
      token: tokenPayload,
    };

    return result;
  } catch (e) {
    logger.logError('apiSignInUser', 'Failed', e);
    return null;
  }
};

export interface ApiFetchUserWalletRequest {
  walletAddress: string;
}

export const apiFetchUserWallet = async (
  params: ApiFetchUserWalletRequest,
): Promise<UserWallet | null> => {
  try {
    logger.logInfo('apiFetchUserWallet', 'Begin');

    const { walletAddress } = params;
    if (!walletAddress) {
      return null;
    }

    const database = new FirestoreDB();
    const result = await database.getUserWallet(walletAddress);

    return result;
  } catch (e) {
    logger.logError('apiFetchUserWallet', 'Failed', e);
    return null;
  }
};
