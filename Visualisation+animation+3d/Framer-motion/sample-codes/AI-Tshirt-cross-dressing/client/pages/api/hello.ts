// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
  if (req.method === "POST") {
    const { name } = req.body;
    res.status(200).json({ name: `Hello, ${name}!` });
  } else {
    res.status(405).json({ name: "Method Not Allowed" });
  }
}
