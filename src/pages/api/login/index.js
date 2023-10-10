import { connectMongoDB } from "@/lib/connect";
import bcrypt from "bcrypt";
import User from "@/db/models/user";

export default async function GET(req, res) {
  try {
    const { fullname, password } = await req.body;

    await connectMongoDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ fullname });
    if (existingUser.password === hashedPassword) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true }));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 401;
      res.end(JSON.stringify({ success: false }));
    }
  } catch {
    console.error(error);
  }
}
