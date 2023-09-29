import { Config } from '@core/config/config';
import { Environments } from '@core/enums/environments';

export const getGATrackingId = (): string => {
  const PegoMainnetTrackingId = 'G-W7FG9D1W1X';
  const PegoTestnetTrackingId = 'G-4BVFN4FPYH';
  

  return Config.environment === Environments.PegoMainnet
    ? PegoMainnetTrackingId
    : Config.environment === Environments.PegoTestnet
    ? PegoTestnetTrackingId
    : '';
};
