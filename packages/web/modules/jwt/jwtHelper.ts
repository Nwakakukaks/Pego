import { Config } from '@core/config/config';
import { AuthToken } from '@core/entities/authToken';
import jwt from 'jsonwebtoken';
import logger from '@core/logger/logger';

export const generateToken = (authToken: AuthToken): string => {
  return jwt.sign(authToken, Config.jwtSecret);
};

export const verifyToken = (token: string): AuthToken => {
  try {
    logger.logInfo('verifyToken', 'Begin');

    if (token?.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }

    const authToken = jwt.verify(token, Config.jwtSecret) as AuthToken;

    console.log(`authToken: ${JSON.stringify(authToken)}`);

    return {
      userId: authToken.userId,
    };
  } catch (e) {
    logger.logError('verifyToken', 'Failed to verify token');
    return null;
  }
};
