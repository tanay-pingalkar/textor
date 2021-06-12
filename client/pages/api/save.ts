import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function save(req: NextApiRequest, res: NextApiResponse): void {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    res.setHeader(
      "Set-Cookie",
      serialize("token", body.token, { path: "/", httpOnly: true })
    );
    res.status(200).json({ msg: "great" });
  } else {
    res.status(400);
  }
}
