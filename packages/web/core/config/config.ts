export interface AppConfig {
  environment: string;
  jwtSecret: string;
  pegoMainnetUrl: string;
  pegoTestnetUrl: string;
 
}

export const Config: AppConfig = {
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'local',
  jwtSecret: process.env.JWT_SECRET || 'jwtsecret',
  pegoMainnetUrl: '',
  pegoTestnetUrl: '',
};
