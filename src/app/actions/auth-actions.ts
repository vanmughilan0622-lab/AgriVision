"use server";

import { prisma as db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerFarmer(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  if (!name || !phone || !password) {
    return { error: "All fields are required" };
  }

  const existingUser = await db.user.findUnique({ where: { phone } });
  if (existingUser) {
    return { error: "Phone number already registered" };
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

  redirect("/");
}

export async function loginFarmer(formData: FormData) {
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  if (!phone || !password) {
    return { error: "Phone and password are required" };
  }

  const user = await db.user.findUnique({ where: { phone } });
  if (!user || !user.password) {
    return { error: "Invalid phone or password" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: "Invalid phone or password" };
  }

  const token = await signToken(user.id);
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, { httpOnly: true, secure: true, path: "/" });

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/login");
}
