"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createAdminSessionToken,
  getAdminCookieName,
  getAdminSessionDuration,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    redirect("/admin/login?error=invalid");
  }

  const store = await cookies();
  store.set(getAdminCookieName(), createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: getAdminSessionDuration(),
  });

  redirect("/admin");
}
