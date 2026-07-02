"use server";

import { prisma as db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

export async function registerFarmer(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    if (!name || !phone || !password) {
      return { error: "All fields are required" };
    }

    const existingUser = await db.user.findUnique({ where: { phone } });
    if (existingUser) {
      return { error: "Email or Phone number already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
        role: "farmer",
      },
    });

    const token = await signToken(user.id);
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, { httpOnly: true, secure: true, path: "/" });
  } catch (err: any) {
    console.error("SERVER CRASH in registerFarmer:", err);
    return { error: `Backend crash: ${err.message}` };
  }
  
  redirect("/");
}

export async function loginFarmer(formData: FormData) {
  try {
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    if (!phone || !password) {
      return { error: "Phone and password are required" };
    }

    const user = await db.user.findUnique({ where: { phone } });
    if (!user || !user.password) {
      return { error: "Invalid credentials" };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { error: "Invalid credentials" };
    }

    const token = await signToken(user.id);
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, { httpOnly: true, secure: true, path: "/" });
  } catch (err: any) {
    console.error("SERVER CRASH in loginFarmer:", err);
    return { error: `Backend crash: ${err.message}` };
  }

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/");
}

export async function getUserProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.userId) return null;
    
    const user = await db.user.findUnique({
      where: { id: payload.userId as string },
      select: { name: true, phone: true, role: true }
    });
    
    return user;
  } catch (error) {
    return null;
  }
}
