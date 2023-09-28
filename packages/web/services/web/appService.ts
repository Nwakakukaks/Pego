import axios from 'axios';
import logger from '@core/logger/logger';
import localStorageHelper from '@core/storage/localStorageHelper';
import { App, ContractDeployments } from '@core/entities/app';
import { Environments } from '@core/enums/environments';
import { Blockchains } from '@core/enums/blockchains';
import { getCurrentTimestamp } from '@core/helpers/datetimeHelper';

export interface CreateDappParams {
  name: string;
  description: string;
}

export const createDapp = async (
  params: CreateDappParams,
): Promise<boolean> => {
  try {
    logger.logInfo('createDapp', 'Begin', params);

    const config = {
      headers: { Authorization: `Bearer ${localStorageHelper.getAuthToken()}` },
    };

    const response = await axios.post('/api/dapp/create', params, config);

    if (response.status !== 200) {
      return false;
    }

    return true;
  } catch (e) {
    logger.logError('createDapp', 'Failed', e);
    return false;
  }
};

export const fetchDapps = async (): Promise<App[]> => {
  try {
    logger.logInfo('fetchDapps', 'Begin');

    const config = {
      headers: { Authorization: `Bearer ${localStorageHelper.getAuthToken()}` },
    };

    const response = await axios.get<App[]>(`/api/dapp`, config);

    return response.data;
  } catch (e) {
    logger.logError('fetchDapps', 'Failed', e);
    return [];
  }
};

export interface DeleteDappParams {
  appId: string;
}

export const deleteDapp = async (
  params: DeleteDappParams,
): Promise<boolean> => {
  try {
    logger.logInfo('deleteDapp', 'Begin', params);

    const config = {
      headers: { Authorization: `Bearer ${localStorageHelper.getAuthToken()}` },
    };

    const response = await axios.post('/api/dapp/delete', params, config);

    if (response.status !== 200) {
      return false;
    }

    return true;
  } catch (e) {
    logger.logError('deleteDapp', 'Failed', e);
    return false;
  }
};

export interface UpdateAppDeploymentParams {
  app: App;
  walletAddress: string;
  blockchain: Blockchains;
  environment: Environments;
  contractAddress: string;
  transactionHash: string;
}

export const updateAppDeployment = async (
  params: UpdateAppDeploymentParams,
): Promise<App | boolean> => {
  try {
    logger.logInfo('updateAppDeployment', 'Begin', params);

    const config = {
      headers: { Authorization: `Bearer ${localStorageHelper.getAuthToken()}` },
    };

    const {
      app,
      walletAddress,
      blockchain,
      environment,
      contractAddress,
      transactionHash,
    } = params;
    const deployment: ContractDeployments = {
      blockchain,
      environment,
      walletAddress,
      transactionHash,
      contractAddress,
      createdDateUTC: getCurrentTimestamp(),
    };

    if (!app.deployments) {
      app.deployments = [];
    }

    app.deployments.push(deployment);

    const requestData = {
      app,
    };

    const response = await axios.post('/api/dapp/update', requestData, config);

    if (response.status !== 200) {
      return false;
    }

    return app;
  } catch (e) {
    logger.logError('updateAppDeployment', 'Failed', e);
    return false;
  }
};
