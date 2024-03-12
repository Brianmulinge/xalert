import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../../utils/auth";

export default async function authState(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = req.cookies; // Retrieves the token from cookies

    // Validates the token. You need to implement the logic for validateToken.
    const isAuthenticated = await validateToken(token);

    // Sends the isAuthenticated flag back to the client
    res.status(200).json({ isAuthenticated });
  } catch (error) {
    console.error("Error validating token:", error);
    // Sends a generic error message to the client without exposing sensitive information
    res.status(500).json({ message: "Internal server error" });
  }
}
