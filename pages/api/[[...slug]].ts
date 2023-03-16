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
      `https://api.rawg.io/api/games/${req.query.singleGameId}?key=${process.env.API_KEY}`
    );

    const data = await response.json();

    res.status(200).json(data);
  };

  request();
}

/* 

`https://api.rawg.io/api/games/${req.query.singleGameId}?key=${process.env.API_KEY}`

`https://api.rawg.io/api/developers?key=${process.env.API_KEY}`

`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=1`

`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`

`https://api.rawg.io/api/platforms?key=${process.env.API_KEY}`

`https://api.rawg.io/api/stores?key=${process.env.API_KEY}`

`https://api.rawg.io/api/games?key=6f43fbe9adea45828438d5dc7b72c345&developers=${context?.params?.slug[0]}`

`https://api.rawg.io/api/games?key=6f43fbe9adea45828438d5dc7b72c345&genres=${context?.params?.slug[0]}`
    
`https://api.rawg.io/api/games?key=6f43fbe9adea45828438d5dc7b72c345&platforms=${context?.params?.slug[0]}`

`https://api.rawg.io/api/games?key=6f43fbe9adea45828438d5dc7b72c345&stores=${context?.params?.slug[0]}`

Sample:
`https://api.rawg.io/api/{type}${
    req.query.singleGameId ? `/${req.query.singleGameId}` : ""
  }?key=${process.env.API_KEY}...`;

*/
