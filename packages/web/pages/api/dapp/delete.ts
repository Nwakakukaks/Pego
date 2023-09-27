// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verifyToken } from '@modules/jwt/jwtHelper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiDeleteApp } from '@handlers/apiDappHandler';

type RequestData = {
  appId: string;
};

type ResponseData = {
  message: string;
};

type ResponseError = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>,
) {
  try {
    if (req.method === 'POST') {
      const { appId }: RequestData = req.body;

      const user = verifyToken(req.headers.authorization);
      if (!user?.userId) {
        return res.status(403).json({ message: 'Unauthorized.' });
      }

      apiDeleteApp({ appId }).then(() => {
        return res.status(200).json({ message: 'Success' });
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
