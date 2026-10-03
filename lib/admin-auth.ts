import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "swe_red_admin";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function getSecret() {
  return process.env.SWE_ADMIN_SESSION_SECRET || process.env.SWE_ADMIN_PASSWORD || "";
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

export function verifyAdminPassword(password: string) {
  const configured = process.env.SWE_ADMIN_PASSWORD;
  return Boolean(configured && safeEqual(password, configured));
}

export function createAdminSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token || !getSecret()) return false;
  const [expiresRaw, signature] = token.split(".");
  if (!expiresRaw || !signature) return false;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000)) {
    return false;
  }

  return safeEqual(signature, sign(expiresRaw));
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  return verifyAdminSessionToken(store.get(COOKIE_NAME)?.value);
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function getAdminSessionDuration() {
  return SESSION_DURATION_SECONDS;
}
