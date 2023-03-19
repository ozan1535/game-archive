// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;

  const request = async () => {
    const response = await fetch(
      slug
        ? `https://api.rawg.io/api/${slug[0]}?key=${process.env.API_KEY}${
            slug && slug?.length > 1 ? `&${slug[2]}=${slug[3]}` : ""
          }&page_size=20&page=${slug[1]}`
        : ""
    );

    const data = await response.json();
    console.log(data, "jajajjjaja");

    res.status(200).json(data.results);
  };

  request();
}
