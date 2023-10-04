export interface AppConfig {
  environment: string;
  jwtSecret: string;
  zetaMainnetUrl: string;
  zetaTestnetUrl: string;
 
}

export const Config: AppConfig = {
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'local',
  jwtSecret: process.env.JWT_SECRET || 'jwtsecret',
  zetaMainnetUrl: '',
  zetaTestnetUrl: '',
};
