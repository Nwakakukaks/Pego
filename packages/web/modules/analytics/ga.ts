import { Config } from '@core/config/config';
import { Environments } from '@core/enums/environments';

export const getGATrackingId = (): string => {
  const ZetaMainnetTrackingId = 'G-W7FG9D1W1X';
  const ZetaTestnetTrackingId = 'G-4BVFN4FPYH';
  

  return Config.environment === Environments.ZetaMainnet
    ? ZetaMainnetTrackingId
    : Config.environment === Environments.ZetaTestnet
    ? ZetaTestnetTrackingId
    : '';
};
