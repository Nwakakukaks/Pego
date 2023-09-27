// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiFetchUserWallet } from '@handlers/apiUserHandler';
import { UserWallet } from '@core/entities/userWallet';

type ResponseData = UserWallet;

type ResponseError = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>,
) {
  try {
    if (req.method === 'GET') {
      const { walletAddress } = req.query;

      apiFetchUserWallet({ walletAddress: walletAddress as string }).then(
        (result) => {
          return res.status(200).json(result);
        },
      );
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
