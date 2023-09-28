import logger from '@core/logger/logger';
import { Blockchains } from '@core/enums/blockchains';
import { generateUUID } from '@core/helpers/generateHelper';
import { signNetworkSignature } from '@modules/blockchains/Network/verification/verification';
import { signInUser } from '@services/web/userService';
import localStorageHelper from '@core/storage/localStorageHelper';

export const authenticateUser = async (
  blockchain: Blockchains,
  walletAddress: string,
): Promise<boolean> => {
  logger.logInfo('signIn', 'Begin');
  let isSuccessful = false;

  try {
    let signature = '';
    if (blockchain === Blockchains.Network) {
      signature = await signNetworkSignature('Pegora Login');
    } else {
      // Randomize signature to avoid predictability
      signature = generateUUID();
    }

    const authToken = await signInUser({
      blockchain,
      walletAddress,
      signature,
    });
    if (authToken) {
      localStorageHelper.storeAuthToken(authToken);
    }

    isSuccessful = true;

    return isSuccessful;
  } catch (e) {
    logger.logWarning('signIn', 'Failed to sign in user.', e);
    return isSuccessful;
  }
};
