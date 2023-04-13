// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });

  const slug = req.query.slug.join("/");

  const method = req?.body ? JSON.parse(req?.body).method : undefined;

  const request = async () => {
    const response = await fetch(
      `${process.env.SERVER_LINK}/api/${slug}?populate=*`,
      {
        method: method || req.method || "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${session?.user?.jwt}`,
        },
        body: req.body ? JSON.stringify(JSON.parse(req.body).data) : null,
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      res.status(200).json(responseData);
    } else {
      res.status(response.status).json(responseData);
    }
  };

  switch (req?.body?.method || req.method || "GET") {
    case "GET":
    case "POST":
    case "PUT":
    case "DELETE":
      request();
      break;
    default:
      res.status(405).end("Method Not Allowed");
      break;
  }
}
