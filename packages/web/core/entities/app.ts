import { AppCreationModes } from '@core/enums/appCreationModes';
import { Blockchains } from '@core/enums/blockchains';
import { AppStatuses } from '@core/enums/appStatuses';
import { Environments } from '@core/enums/environments';

export interface App {
  appId: string;
  name: string;
  description: string;
  status: AppStatuses;
  createdDateUTC: number;
  userId: string;
  appCreationMode: AppCreationModes;
  contractTemplateId?: string;
  contractCode?: string;
  contractAbi?: any;
  contractByteCode?: string;
  deployments?: ContractDeployments[];
}

export interface ContractDeployments {
  blockchain: Blockchains;
  environment: Environments;
  walletAddress: string;
  transactionHash?: string;
  contractAddress?: string;
  createdDateUTC: number;
}
