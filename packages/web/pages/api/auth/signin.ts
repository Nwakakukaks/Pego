// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { JWT } from '@core/entities/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiSignInUser } from '@handlers/apiUserHandler';
import logger from '@core/logger/logger';

type RequestData = {
  blockchain: string;
  walletAddress: string;
  signature: string;
};

type ResponseData = JWT;

type ResponseError = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>,
) {
  try {
    if (req.method === 'POST') {
      const { blockchain, walletAddress, signature }: RequestData = req.body;

      if (!blockchain || !walletAddress || !signature) {
        return res.status(400).json({ message: 'Invalid parameters.' });
      }

      apiSignInUser({ blockchain, walletAddress, signature }).then((result) => {
        return res.status(200).json(result);
      });
    } else {
      return res.status(400).json({ message: 'HTTP status not supported.' });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: 'An error has occured on the server.' });
  }
}
