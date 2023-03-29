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
      `${process.env.SERVER_LINK}/api/${req.body.slug}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${req.body.jwt}`,
        },
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  };

  request();
}
