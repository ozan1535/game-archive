// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const request = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page_size=15`
    );

    const data = await response.json();

    res.status(200).json(data);
  };

  request();
}
