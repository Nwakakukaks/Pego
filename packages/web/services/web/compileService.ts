import axios from 'axios';
import logger from '@core/logger/logger';
import localStorageHelper from '@core/storage/localStorageHelper';

export interface CompileParams {
  appId: string;
  contractName: string;
  code: string;
  templateId: string;
}

export const compile = async (params: CompileParams): Promise<boolean> => {
  try {
    logger.logInfo('compile', 'Begin', params);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageHelper.getAuthToken()}`,
      },
    };

    const response = await axios.post('/api/dapp/compile', params, config);

    if (response.status !== 200) {
      return false;
    }

    if (response.data.isSuccessful) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    logger.logError('compile', 'Failed', e);
    return false;
  }
};
