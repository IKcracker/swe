import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { loginAdmin } from "./actions";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <main className="admin-auth-shell">
      <section className="admin-login-card">
        <span className="admin-kicker">SWE Red Operations</span>
        <h1>Admin login</h1>
        <p>
          Manage shipments, tracking events and delivery statuses from one place.
        </p>

        <form action={loginAdmin} className="admin-login-form">
          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>

          {error === "invalid" ? (
            <p className="admin-form-error">Incorrect admin password.</p>
          ) : null}

          <button type="submit">Sign in</button>
        </form>

        <Link href="/track">Back to public tracking</Link>
      </section>
    </main>
  );
}
