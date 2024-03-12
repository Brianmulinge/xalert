import jwt from "jsonwebtoken";

// This should be the same secret key you use when signing your JWTs
const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function validateToken(
  token: string | undefined
): Promise<boolean> {
  if (!token || !SECRET_KEY) {
    return false;
  }
  try {
    // Verify the token with the secret key
    jwt.verify(token, SECRET_KEY);
    return true; // The token is valid
  } catch (error) {
    // Token verification failed
    return false;
  }
}
