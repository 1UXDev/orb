import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function POST(req) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return NextResponse.badRequest(
        "Missing fields: name, email, or password",
        {
          status: 400,
        }
      );
    }

    // Perform more comprehensive input validation for email and password here

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.badRequest("User with this email already exists", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User registered successfully",
      user,
    }).redirect("/login");
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
