import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    // Passwords match
    // Ensure you have a JWT_SECRET in your environment variables for token signing
    const token = jwt.sign(
      { id: user.userId, email: user.email },
      process.env.JWT_SECRET_KEY!, // Assert that JWT_SECRET is not undefined
      { expiresIn: '8h' }
    );
    

    res.status(200).json({ message: "Successfully signed in", token });
  } else {
    // Authentication failed
    res.status(401).json({ error: "Email or password is wrong" });
  }
}
