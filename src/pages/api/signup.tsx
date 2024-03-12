// pages/api/signup.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // You should validate and sanitize input here
  const { email, password, userName } = req.body as {
    email: string;
    password: string;
    userName: string;
  };
  const safeUserName = userName || email.split("@")[0];
  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Save user to database
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userName: safeUserName, // Add this field if it's required in your Prisma schema
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "User already exists or another error occurred." });
  }
}
