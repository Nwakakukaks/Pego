import logger from '@core/logger/logger';
import { generateUUID } from '@core/helpers/generateHelper';
import { App } from '@core/entities/app';
import { FirestoreDB } from '@modules/firebase/firestore';
import { AppStatuses } from '@core/enums/appStatuses';
import { AppCreationModes } from '@core/enums/appCreationModes';
import { getCurrentTimestamp } from '@core/helpers/datetimeHelper';

export interface ApiCreateDappRequest {
  name: string;
  description: string;
  userId: string;
} 

export interface ApiCreateDappResponse {
  app?: App;
  isNameExists?: Boolean;
}

export const apiCreateDapp = async (
  params: ApiCreateDappRequest,
): Promise<ApiCreateDappResponse> => {
  logger.logInfo('apiCreateDapp', 'Begin', params);

  try {
    const { name, description, userId } = params;

    if (!userId || !name) {
      return;
    }

    // Check if dapp with same name already exists
    const userApps = await apiFetchAppByUser({ userId });
    const isNameExists = userApps.find(
      (app) => app.name.toLowerCase() === name.trim().toLowerCase(),
    );
    if (isNameExists) {
      return {
        isNameExists: true,
      };
    }

    // Create new dapp
    const appId = generateUUID();
    const newApp: App = {
      appId,
      name,
      description,
      status: AppStatuses.PendingContract,
      appCreationMode: AppCreationModes.Template,
      createdDateUTC: getCurrentTimestamp(),
      userId,
    };

    const database = new FirestoreDB();
    await database.addApp(newApp);

    return {
      app: newApp,
    };
  } catch (e) {
    logger.logError('apiCreateDapp', 'Failed', e);
    throw e;
  }
};

export interface ApiFetchAppByUserRequest {
  userId: string;
}

export const apiFetchAppByUser = async (
  params: ApiFetchAppByUserRequest,
): Promise<App[]> => {
  logger.logInfo('apiFetchAppByUser', 'Begin', params);

  try {
    const { userId } = params;
    if (!userId) {
      return null;
    }

    const database = new FirestoreDB();
    const result = await database.getAppsByUser(userId);

    return result;
  } catch (e) {
    logger.logError('apiFetchAppByUser', 'Failed', e);
    throw e;
  }
};

export interface ApiFetchAppRequest {
  appId: string;
}

export const apiFetchApp = async (
  params: ApiFetchAppRequest,
): Promise<App | null> => {
  logger.logInfo('apiFetchApp', 'Begin', params);

  try {
    const { appId } = params;
    if (!appId) {
      return null;
    }

    const database = new FirestoreDB();
    const result = await database.getApp(appId);

    return result;
  } catch (e) {
    logger.logError('apiFetchApp', 'Failed', e);
    throw e;
  }
};

export interface ApiDeleteAppRequest {
  appId: string;
}

export const apiDeleteApp = async (
  params: ApiDeleteAppRequest,
): Promise<void> => {
  logger.logInfo('apiDeleteApp', 'Begin', params);

  try {
    const { appId } = params;

    if (!appId) {
      return;
    }

    // TODO: check if app belong to userId

    const database = new FirestoreDB();
    await database.deleteApp(appId);
  } catch (e) {
    logger.logError('apiDeleteApp', 'Failed', e);
    throw e;
  }
};

export interface ApiUpdateDappCodeRequest {
  appId: string;
  mode: 'COMPILED_BUILD';
  code?: string;
  byteCode?: string;
  abi?: string;
}

export interface ApiUpdateDappCodeResponse {
  app?: App;
}

export const apiUpdateDappCode = async (
  params: ApiUpdateDappCodeRequest,
): Promise<ApiUpdateDappCodeResponse> => {
  logger.logInfo('apiUpdateDappCode', 'Begin', params);

  try {
    const { appId, mode, code, byteCode, abi } = params;

    const app = await apiFetchApp({ appId });
    if (app) {
      if (mode === 'COMPILED_BUILD') {
        app.contractCode = code;
        app.contractByteCode = byteCode;
        app.contractAbi = abi;
        app.status = AppStatuses.Compiled;

        const database = new FirestoreDB();
        await database.updateApp(app);
      }
    }

    return {
      app,
    };
  } catch (e) {
    logger.logError('apiUpdateDappCode', 'Failed', e);
    throw e;
  }
};

export interface ApiUpdateDappRequest {
  app: App;
}

export const apiUpdateDapp = async (
  params: ApiUpdateDappRequest,
): Promise<void> => {
  logger.logInfo('apiUpdateDapp', 'Begin', params);

  try {
    const { app } = params;

    const database = new FirestoreDB();
    await database.updateApp(app);
  } catch (e) {
    logger.logError('apiUpdateDapp', 'Failed', e);
    throw e;
  }
};
