import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function logout(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === "GET") {
    res.setHeader("Set-Cookie", serialize("token", "", { maxAge: -1 }));
    res.status(200).json({ msg: "great" });
  } else {
    res.status(400);
  }
}
