import { connectMongoDB } from "@/lib/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/db/models/user";

export default async function POST(req, res) {
  try {
    const { fullname, email, password } = await req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();

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
