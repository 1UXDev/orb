import { connectMongoDB } from "@/lib/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/db/models/user";

export default async function POST(req, res) {
  try {
    const { fullname, email, password } = await req.body;

    await connectMongoDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists");

      return res.status(400).json({ message: "User already exists" });
    }

    // hash only if new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: fullname,
      email,
      password: hashedPassword,
    });

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true }));
  } catch (error) {
    console.error(error);
  }
}
